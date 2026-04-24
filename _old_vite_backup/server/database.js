const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDatabase();
    }
});

function initDatabase() {
    db.serialize(() => {
        // News Table
        db.run(`CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            date TEXT,
            imageUrl TEXT,
            excerpt TEXT,
            content TEXT,
            metaTitle TEXT,
            metaDescription TEXT,
            keywords TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Library Table
        db.run(`CREATE TABLE IF NOT EXISTS library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            type TEXT,
            description TEXT,
            tag TEXT,
            image_url TEXT,
            link TEXT,
            author TEXT,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Tools Table
        db.run(`CREATE TABLE IF NOT EXISTS tools (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            icon TEXT,
            link TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Pricing Table
        db.run(`CREATE TABLE IF NOT EXISTS pricing (
            id TEXT PRIMARY KEY,
            name TEXT,
            price TEXT,
            period TEXT,
            description TEXT,
            features TEXT,
            ctaText TEXT,
            type TEXT,
            isPopular INTEGER
        )`);

        // Contacts Table
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            service TEXT,
            note TEXT,
            company TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Settings Table
        db.run(`CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )`);

        // Seed Data if empty
        seedData();
    });
}

function seedData() {
    // Check if news exists
    db.get("SELECT count(*) as count FROM news", (err, row) => {
        if (row.count === 0) {
            console.log("Seeding News...");
            const newsValues = [
                ['Nghị định 175/2024/NĐ-CP: Lộ trình áp dụng BIM mới', 'Nghị định', '15/12/2024', 'https://picsum.photos/seed/news1/200/200', 'Chính phủ ban hành Nghị định mới về BIM...', '<p>Chi tiết về nghị định 175...</p>'],
                ['Thông tư 10/2024 về hướng dẫn áp dụng BIM', 'Thông tư', '10/12/2024', 'https://picsum.photos/seed/news2/200/200', 'Bộ Xây dựng hướng dẫn chi tiết...', '<p>Nội dung thông tư 10...</p>'],
                ['Xu hướng Digital Twin trong xây dựng 2025', 'Xu hướng', '05/12/2024', 'https://picsum.photos/seed/news3/200/200', 'Công nghệ bản sao số đang lên ngôi...', '<p>Phân tích xu hướng Digital Twin...</p>']
            ];
            const stmt = db.prepare("INSERT INTO news (title, category, date, imageUrl, excerpt, content) VALUES (?, ?, ?, ?, ?, ?)");
            newsValues.forEach(v => stmt.run(v));
            stmt.finalize();
        }
    });

    // Check if settings exist
    db.get("SELECT count(*) as count FROM settings", (err, row) => {
        if (row.count === 0) {
            console.log("Seeding Settings...");
            const settings = {
                companyName: 'CIC BIM Hub',
                address: 'Hà Nội, Việt Nam',
                phone: '0901234567',
                email: 'contact@cic.example.com',
                footerDescription: 'Nền tảng tri thức và công cụ hỗ trợ chuyển đổi số hàng đầu cho ngành xây dựng Việt Nam.',
                facebook: 'https://facebook.com/cicbim',
                linkedin: 'https://linkedin.com/company/cicbim'
            };
            db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['general', JSON.stringify(settings)]);
        }
    });

    // Check if pricing exists
    db.get("SELECT count(*) as count FROM pricing", (err, row) => {
        if (row.count === 0) {
            console.log("Seeding Pricing...");
            const pricingData = [
                ['startup', 'Basic (Cá nhân)', '0đ', '/tháng', 'Dành cho sinh viên và người mới bắt đầu.', '["Truy cập kho thư viện","Đọc tin tức pháp lý","Tham gia cộng đồng"]', 'Đăng ký miễn phí', 'software', 0],
                ['business', 'Pro (Doanh nghiệp)', '2.500.000đ', '/tháng', 'Dành cho công ty SME.', '["Tất cả tính năng Basic","5 Licenses Add-on","Hỗ trợ 24/7"]', 'Liên hệ tư vấn', 'software', 1],
                ['enterprise', 'Enterprise', 'Liên hệ', '', 'Giải pháp tập đoàn.', '["Tùy biến bộ công cụ","Đào tạo nội bộ","Server riêng"]', 'Gặp chuyên gia', 'software', 0]
            ];
            const stmt = db.prepare("INSERT INTO pricing (id, name, price, period, description, features, ctaText, type, isPopular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            pricingData.forEach(v => stmt.run(v));
            stmt.finalize();
        }
    });
}

module.exports = db;
