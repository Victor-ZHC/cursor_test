// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // ====== 导航栏功能 ======
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // 平滑滚动到指定位置
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====== 导航栏滚动效果 ======
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景透明度变化
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ====== 产品分类筛选功能 ======
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新活跃标签
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选产品
            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // ====== 新闻标签切换功能 ======
    const newsTabBtns = document.querySelectorAll('.news-tab-btn');
    const newsLists = document.querySelectorAll('.news-list');
    
    newsTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const newsType = this.getAttribute('data-news-type');
            
            // 更新活跃标签
            newsTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 切换新闻内容
            newsLists.forEach(list => {
                list.classList.remove('active');
                if (list.classList.contains(newsType + '-news')) {
                    list.classList.add('active');
                }
            });
        });
    });
    
    // ====== 联系表单处理 ======
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // 基本验证
            if (!name || !phone || !subject || !message) {
                showMessage('请填写所有必填项！', 'error');
                return;
            }
            
            // 电话号码验证
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                showMessage('请输入正确的手机号码！', 'error');
                return;
            }
            
            // 邮箱验证（如果填写了邮箱）
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showMessage('请输入正确的邮箱地址！', 'error');
                    return;
                }
            }
            
            // 模拟提交成功
            showMessage('留言提交成功！我们会尽快与您联系。', 'success');
            this.reset();
        });
    }
    
    // ====== 招聘申请功能 ======
    const applyBtns = document.querySelectorAll('.btn-apply');
    
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobItem = this.closest('.job-item');
            const jobTitle = jobItem.querySelector('h4').textContent;
            
            // 模拟申请处理
            if (confirm(`确定要申请 "${jobTitle}" 职位吗？\n\n点击确定后，请发送简历至：hr@jinxiangzhachuan.com\n邮件标题请注明：应聘-${jobTitle}`)) {
                showMessage(`感谢您对 "${jobTitle}" 职位的关注！请发送简历至 hr@jinxiangzhachuan.com`, 'success');
            }
        });
    });
    
    // ====== 返回顶部按钮 ======
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ====== 页面滚动时的动画效果 ======
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.advantage-item, .news-item, .product-item, .benefit-item, .culture-item, .service-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ====== 阅读更多功能 ======
    const readMoreBtns = document.querySelectorAll('.read-more');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const article = this.closest('.news-article');
            const title = article.querySelector('h3').textContent;
            
            // 模拟文章详情页面
            showMessage(`正在跳转到 "${title}" 详情页面...`, 'info');
        });
    });
    
    // ====== 社交媒体链接 ======
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList[1];
            
            if (platform.includes('weixin')) {
                showMessage('请扫描二维码关注我们的微信公众号！', 'info');
            } else if (platform.includes('weibo')) {
                showMessage('正在跳转到我们的微博主页...', 'info');
            } else if (platform.includes('qq')) {
                showMessage('正在跳转到我们的QQ空间...', 'info');
            }
        });
    });
    
    // ====== 产品图片点击放大效果 ======
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            showMessage(`正在查看 "${productName}" 的详细图片...`, 'info');
        });
    });
    
    // ====== 服务项目点击效果 ======
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h4').textContent;
            showMessage(`了解更多关于 "${serviceTitle}" 的信息，请联系我们！`, 'info');
        });
    });
    
    // ====== 时间线项目点击效果 ======
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const year = this.querySelector('.timeline-year').textContent;
            const title = this.querySelector('h4').textContent;
            showMessage(`${year}年：${title}`, 'info');
        });
    });
    
});

// ====== 消息提示功能 ======
function showMessage(message, type = 'info') {
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // 设置样式
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
        line-height: 1.4;
    `;
    
    document.body.appendChild(messageEl);
    
    // 显示动画
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动消失
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// ====== 表单验证工具函数 ======
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ====== 字符串工具函数 ======
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// ====== 日期格式化函数 ======
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('zh-CN', options);
}

// ====== 平滑滚动到指定元素 ======
function scrollToElement(elementId, offset = 70) {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
        const offsetTop = element.offsetTop - offset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ====== 加载动画（可选） ======
window.addEventListener('load', function() {
    // 页面加载完成后的处理
    document.body.classList.add('loaded');
    
    // 延迟显示某些元素
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// ====== 响应式图片懒加载（预留） ======
function initLazyLoading() {
    const images = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ====== 键盘快捷键支持 ======
document.addEventListener('keydown', function(e) {
    // ESC 键关闭移动端菜单
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Ctrl + 首页字母快速导航
    if (e.ctrlKey) {
        switch(e.key) {
            case 'h':
                e.preventDefault();
                scrollToElement('#home');
                break;
            case 'a':
                e.preventDefault();
                scrollToElement('#about');
                break;
            case 'p':
                e.preventDefault();
                scrollToElement('#products');
                break;
            case 'n':
                e.preventDefault();
                scrollToElement('#news');
                break;
            case 'c':
                e.preventDefault();
                scrollToElement('#contact');
                break;
        }
    }
});

// ====== 错误处理 ======
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 在生产环境中，可以发送错误报告到服务器
});

// ====== 性能监控（可选） ======
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`页面加载时间: ${loadTime}ms`);
        }, 0);
    });
}

// 导出全局函数（如果需要）
window.ZhaChuanSite = {
    showMessage,
    scrollToElement,
    validatePhone,
    validateEmail,
    formatDate
};