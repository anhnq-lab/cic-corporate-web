
// API Service - Client Side

const API_URL = '/api'; // Proxy will handle forwarding to port 3000

export const api = {
    trackView: async (path: string) => {
        // console.log(`Tracking view: ${path}`);
        return Promise.resolve();
    },

    // --- LIBRARY ---
    getLibrary: async () => {
        const res = await fetch(`${API_URL}/library`);
        if (!res.ok) throw new Error('Failed to fetch library');
        return res.json();
    },
    getLibraryDetail: async (id: string) => {
        // For now, filtering client side as detail endpoint might not be separate yet
        const libs = await api.getLibrary();
        return libs.find((l: any) => l.id == id) || null;
    },
    addLibrary: async (data: any) => {
        const res = await fetch(`${API_URL}/library`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add library');
        return res.json();
    },
    updateLibrary: async (id: any, data: any) => {
        const res = await fetch(`${API_URL}/library/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update library');
        return res.json();
    },
    deleteLibrary: async (id: any) => {
        const res = await fetch(`${API_URL}/library/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete library');
        return res.json();
    },

    // --- NEWS ---
    getNews: async () => {
        const res = await fetch(`${API_URL}/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        return res.json();
    },
    getNewsDetail: async (id: string) => {
        const news = await api.getNews();
        return news.find((n: any) => n.id == id) || null;
    },
    getRelatedNews: async (id: string) => {
        const news = await api.getNews();
        return news.filter((n: any) => n.id != id).slice(0, 3);
    },
    addNews: async (data: any) => {
        const res = await fetch(`${API_URL}/news`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add news');
        return res.json();
    },
    updateNews: async (id: any, data: any) => {
        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update news');
        return res.json();
    },
    deleteNews: async (id: any) => {
        const res = await fetch(`${API_URL}/news/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete news');
        return res.json();
    },

    // --- TOOLS ---
    getTools: async () => {
        const res = await fetch(`${API_URL}/tools`);
        if (!res.ok) throw new Error('Failed to fetch tools');
        return res.json();
    },
    addTool: async (tool: any) => {
        const res = await fetch(`${API_URL}/tools`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tool)
        });
        if (!res.ok) throw new Error('Failed to add tool');
        return res.json();
    },
    updateTool: async (id: any, tool: any) => {
        const res = await fetch(`${API_URL}/tools/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tool)
        });
        if (!res.ok) throw new Error('Failed to update tool');
        return res.json();
    },
    deleteTool: async (id: number) => {
        const res = await fetch(`${API_URL}/tools/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete tool');
        return res.json();
    },

    // --- PRICING ---
    getPricing: async () => {
        const res = await fetch(`${API_URL}/pricing`);
        if (!res.ok) return DEFAULT_PRICING;
        return res.json();
    },
    updatePricing: async (id: any, pkg: any) => {
        const res = await fetch(`${API_URL}/pricing/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pkg)
        });
        if (!res.ok) throw new Error('Failed to update pricing');
        return res.json();
    },

    // --- SETTINGS ---
    getSettings: async () => {
        const res = await fetch(`${API_URL}/settings`);
        if (!res.ok) return {};
        return res.json();
    },
    saveSettings: async (s: any) => {
        const res = await fetch(`${API_URL}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        });
        if (!res.ok) throw new Error('Failed to save settings');
        return res.json();
    },

    // --- CONTACTS ---
    getContacts: async () => {
        const res = await fetch(`${API_URL}/contacts`);
        if (!res.ok) throw new Error('Failed to fetch contacts');
        return res.json();
    },
    deleteContact: async (id: number) => {
        const res = await fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete contact');
        return res.json();
    },

    // --- AI FEATURES (REAL) ---
    subscribeNewsletter: async (email: string) => {
        // Mock
        return Promise.resolve({ success: true, message: 'Đăng ký thành công!' });
    },

    generatePost: async (topic: string) => {
        const res = await fetch(`${API_URL}/ai/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: topic, type: 'post' })
        });
        if (!res.ok) throw new Error('AI Generation Failed');
        return res.json();
    },

    generateSEO: async (content: string) => {
        const res = await fetch(`${API_URL}/ai/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: content, type: 'seo' })
        });
        if (!res.ok) throw new Error('AI Generation Failed');
        return res.json();
    },

    generateSocialPosts: async (content: string) => {
        const res = await fetch(`${API_URL}/ai/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: content, type: 'social' })
        });
        if (!res.ok) throw new Error('AI Generation Failed');
        return res.json();
    },

    getAnalyticsStats: async () => {
        const res = await fetch(`${API_URL}/analytics/stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
    },
    getAnalyticsInsight: async () => {
        const res = await fetch(`${API_URL}/analytics/insight`);
        if (!res.ok) throw new Error('Failed to fetch insight');
        return res.json();
    },
};

// Fallback data for components that might break if DB is empty and no fallback
const DEFAULT_PRICING = [
    {
        id: 1,
        name: 'Cá nhân (Basic)',
        price: '0',
        period: '/ tháng',
        description: 'Dành cho sinh viên và người mới bắt đầu tìm hiểu BIM.',
        features: ['Truy cập kho thư viện miễn phí', 'Đọc tin tức & pháp lý', 'Tham gia cộng đồng cơ bản'],
        ctaText: 'Đăng ký miễn phí',
        type: 'software'
    },
    {
        id: 2,
        name: 'Doanh nghiệp (Pro)',
        price: '2.500.000đ',
        period: '/ tháng',
        description: 'Dành cho các doanh nghiệp tư vấn thiết kế vừa và nhỏ.',
        features: ['Tất cả tính năng Basic', '5 Licenses Add-on CIC Tools', 'Hỗ trợ kỹ thuật 24/7', 'Tư vấn triển khai ban đầu'],
        ctaText: 'Liên hệ tư vấn',
        isPopular: true,
        type: 'software'
    },
    {
        id: 3,
        name: 'Enterprise',
        price: 'Liên hệ',
        period: '',
        description: 'Giải pháp toàn diện cho các tổng công ty và tập đoàn.',
        features: ['Tùy biến bộ công cụ theo nhu cầu', 'Đào tạo nội bộ (In-house)', 'Tư vấn chiến lược chuyển đổi số', 'Server lưu trữ riêng'],
        ctaText: 'Gặp chuyên gia',
        type: 'software'
    }
];
