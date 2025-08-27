document.addEventListener('DOMContentLoaded', function() {
    // 画像の事前読み込み最適化
    const preloadImages = [
        'fusari-hero-optimized.jpg',
        'background-image.jpg'
    ];
    
    preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
    });
    
    const screens = document.querySelectorAll('.screen');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    let currentScreen = 0;
    
    // 画面遷移関数
    function transitionToScreen(targetScreenId) {
        const currentScreenElement = screens[currentScreen];
        const targetScreenElement = document.getElementById(targetScreenId);
        
        if (!targetScreenElement) return;
        
        // 現在の画面をフェードアウト
        currentScreenElement.classList.add('fade-out');
        
        setTimeout(() => {
            // 現在の画面を非表示にし、次の画面を表示
            currentScreenElement.style.display = 'none';
            currentScreenElement.classList.remove('fade-out');
            
            targetScreenElement.style.display = 'block';
            targetScreenElement.classList.add('fade-in');
            
            // 次の画面のインデックスを更新
            for (let i = 0; i < screens.length; i++) {
                if (screens[i].id === targetScreenId) {
                    currentScreen = i;
                    break;
                }
            }
            
            // ローディング画面の場合、自動リダイレクトを開始
            if (targetScreenId === 'loading') {
                startLoadingAndRedirect();
            }
            
            // フェードインアニメーションをリセット
            setTimeout(() => {
                targetScreenElement.classList.remove('fade-in');
            }, 350);
            
        }, 200);
    }
    
    // ローディング画面の処理と自動リダイレクト
    function startLoadingAndRedirect() {
        // 2秒後に外部リンクにリダイレクト
        setTimeout(() => {
            window.location.href = 'https://ec.epauler.co.jp/lp?u=ij_epo_reg001b';
        }, 2000);
    }
    
    // リップル効果を作成する関数
    function createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: ripple 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 400);
    }

    // オプションボタンのクリックイベントを設定
    optionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const nextScreen = this.getAttribute('data-next');
            
            // ボタンのクリックエフェクト（高速レスポンス版）
            this.style.transform = 'scale(0.98) translateY(1px)';
            this.style.transition = 'all 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.background = 'linear-gradient(145deg, rgba(165, 42, 42, 0.4), rgba(205, 133, 63, 0.2), rgba(139, 0, 0, 0.4))';
            this.style.color = '#ffd700';
            this.style.textShadow = '1px 1px 4px rgba(165, 42, 42, 1), 0 0 20px rgba(205, 133, 63, 0.8)';
            this.style.boxShadow = 'inset 0 2px 8px rgba(139, 0, 0, 0.3), 0 4px 16px rgba(205, 133, 63, 0.4)';
            
            // リップル効果を追加
            createRippleEffect(event, this);
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
                this.style.background = '';
                this.style.color = '';
                this.style.textShadow = '';
                this.style.boxShadow = '';
            }, 100);
            
            // 高速画面遷移開始
            setTimeout(() => {
                transitionToScreen(nextScreen);
            }, 50);
        });
        
        // ボタンのホバーエフェクトを強化
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // キーボードナビゲーション（アクセシビリティ向上）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('option-btn')) {
                focusedElement.click();
                e.preventDefault();
            }
        }
    });
    
    // ページロード時のアニメーション
    setTimeout(() => {
        const firstScreen = document.getElementById('screen1');
        firstScreen.classList.add('fade-in');
        
        setTimeout(() => {
            firstScreen.classList.remove('fade-in');
        }, 800);
    }, 100);
    
    // 光のエフェクトを追加（背景）
    function createLightEffect() {
        const container = document.querySelector('.container');
        const lightElement = document.createElement('div');
        
        lightElement.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(205, 133, 63, 0.8) 0%, rgba(165, 42, 42, 0.4) 50%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            box-shadow: 0 0 15px rgba(205, 133, 63, 0.5);
        `;
        
        // ランダムな位置と移動方向を設定
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = startY + (Math.random() - 0.5) * 200;
        
        lightElement.style.left = startX + 'px';
        lightElement.style.top = startY + 'px';
        
        container.appendChild(lightElement);
        
        // アニメーション
        lightElement.animate([
            { 
                transform: 'translate(0, 0) scale(0)',
                opacity: 0 
            },
            { 
                transform: `translate(${(endX - startX) / 2}px, ${(endY - startY) / 2}px) scale(1)`,
                opacity: 1 
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 3000,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            lightElement.remove();
        });
    }
    
    // より頻繁で軽量な光のエフェクトを生成
    setInterval(createLightEffect, 1200);
});