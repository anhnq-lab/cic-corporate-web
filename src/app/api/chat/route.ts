import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@supabase/supabase-js';
import { rateLimit } from '@/lib/rate-limiter';

// Rate limit configuration: 20 requests per minute per IP
const CHAT_RATE_LIMIT = { max: 20, windowMs: 60 * 1000 };

// Thiết lập OpenAI-compatible client trỏ về local vLLM/LiteLLM
const localAI = createOpenAI({
  baseURL: process.env.LOCAL_AI_API_URL || 'http://localhost:8001/v1',
  apiKey: process.env.LOCAL_AI_API_KEY || 'sk-cic-2026',
});

/**
 * Get client IP from request headers
 */
function getClientIP(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

const SYSTEM_PROMPT = `Bạn là "CIC AI" — Trợ lý thông minh của Công ty CP Công nghệ và Tư vấn CIC (cic.com.vn).
Bạn chạy hoàn toàn trên máy chủ local của CIC (bảo mật 100%).

## Nguyên tắc trả lời:
1. Luôn trả lời bằng **Tiếng Việt**, giọng chuyên nghiệp, lịch sự nhưng thân thiện.
2. Format bằng **Markdown**: dùng bảng, danh sách, in đậm cho những điểm nhấn quan trọng.
3. Khi được hỏi về giải pháp, phần mềm, BẮT BUỘC sử dụng Danh sách Sản phẩm dưới đây để gợi ý đúng tên và Link.
4. Giao diện frontend sẽ tự động render Link đẹp thành các Card Sản phẩm nếu bạn trả về đúng cú pháp markdown link thông thường, ví dụ: \`[Tên phần mềm](https://cic.com.vn/san-pham/slug-cua-san-pham)\` hoặc \`[Tin tức ABC](https://cic.com.vn/tin-tuc/slug-bai-viet)\`
5. Nếu không có dữ liệu, hãy nói rõ tôi chưa có dữ liệu. Không bịa đặt thông tin.
6. Thêm các emoji phù hợp để tăng trải nghiệm đọc.`;



export async function POST(req: Request) {
  try {
    // ── Rate Limiting ──
    const clientIP = getClientIP(req);
    const limit = rateLimit(clientIP, CHAT_RATE_LIMIT);

    if (!limit.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
          retryAfter: limit.retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(CHAT_RATE_LIMIT.max),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(limit.reset),
            'Retry-After': String(limit.retryAfter),
          },
        }
      );
    }

    const { messages } = await req.json();
    const startTime = Date.now();
    const isLocalAI = true;

    let dynamicContext = "";
    const supabaseAdmin = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      : null;

    if (supabaseAdmin) {
      try {
        const { data: products } = await supabaseAdmin.from('products').select('name, slug, summary').eq('is_published_web', true).limit(200);
        const { data: news } = await supabaseAdmin.from('cms_posts').select('title, slug').eq('status', 'published').order('published_at', { ascending: false }).limit(10);

        dynamicContext = `\n\n### DANH SÁCH SẢN PHẨM TRONG HỆ THỐNG (Khuyên dùng khi trả lời):\n` +
          (products?.map(p => `- ${p.name} (Link slug: ${p.slug}) - ${p.summary || ''}`).join("\n") || 'Không có') +
          `\n\n### TIN TỨC MỚI NHẤT:\n` +
          (news?.map(n => `- ${n.title} (Link slug: ${n.slug})`).join("\n") || 'Không có');
      } catch (e) {
        console.warn("[RAG] Failed to fetch context", e);
      }
    }

    const result = await streamText({
      model: localAI(process.env.LOCAL_AI_MODEL || 'gemma-4-26b'),
      system: SYSTEM_PROMPT + dynamicContext,
      messages,
      temperature: 0.3,
      maxTokens: 2048,
      async onFinish({ text, usage }) {
        if (!supabaseAdmin) return;
        try {
          const latencyMs = Date.now() - startTime;
          const userMessage = messages[messages.length - 1]?.content || "";

          // Lưu log vào Supabase (Bỏ qua lỗi nếu không thành công để không gián đoạn app)
          await supabaseAdmin.from('ai_logs').insert({
            model_id: process.env.LOCAL_AI_MODEL || 'gemma-4-26b',
            provider: 'local',
            action_type: 'web_chat',
            source: 'corporate_web',
            prompt_tokens: usage?.promptTokens || 0,
            completion_tokens: usage?.completionTokens || 0,
            latency_ms: latencyMs,
            success: true,
            input_preview: userMessage.substring(0, 500),
            output_preview: text.substring(0, 500)
          });
        } catch (e) {
          console.warn("[AI Logging] Failed to save log", e);
        }
      }
    });

    const response = result.toTextStreamResponse();

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', String(CHAT_RATE_LIMIT.max));
    response.headers.set('X-RateLimit-Remaining', String(limit.remaining));
    response.headers.set('X-RateLimit-Reset', String(limit.reset));

    return response;
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req: Request) {
  let dynamicContext = "";
  const supabaseAdmin = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null;

  if (supabaseAdmin) {
    try {
      const { data: products } = await supabaseAdmin.from('products').select('name, slug, summary').eq('is_published_web', true).limit(200);
      const { data: news } = await supabaseAdmin.from('cms_posts').select('title, slug').eq('status', 'published').order('published_at', { ascending: false }).limit(10);

      dynamicContext = `\n\n### DANH SÁCH SẢN PHẨM TRONG HỆ THỐNG (Khuyên dùng khi trả lời):\n` +
        (products?.map(p => `- ${p.name} (Link slug: ${p.slug}) - ${p.summary || ''}`).join("\n") || 'Không có') +
        `\n\n### TIN TỨC MỚI NHẤT:\n` +
        (news?.map(n => `- ${n.title} (Link slug: ${n.slug})`).join("\n") || 'Không có');
    } catch (e) {
      console.warn("[RAG] Failed to fetch context", e);
    }
  }

  return new Response(JSON.stringify({ systemPrompt: SYSTEM_PROMPT + dynamicContext }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

