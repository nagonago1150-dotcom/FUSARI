document.addEventListener('DOMContentLoaded', function() {
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
            }, 800);
            
        }, 400);
    }
    
    // ローディング画面の処理と自動リダイレクト
    function startLoadingAndRedirect() {
        // 2秒後に外部リンクにリダイレクト
        setTimeout(() => {
            window.location.href = 'https://ec.epauler.co.jp/lp?u=ij_epo_reg001b';
        }, 2000);
    }
    
    // オプションボタンのクリックイベントを設定
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextScreen = this.getAttribute('data-next');
            
            // ボタンのクリックエフェクト（FUSARI商品に合わせて調整）
            this.style.transform = 'translateY(1px)';
            this.style.background = 'linear-gradient(145deg, rgba(165, 42, 42, 0.3), rgba(205, 133, 63, 0.15), rgba(139, 0, 0, 0.3))';
            this.style.color = '#ffd700';
            this.style.textShadow = '1px 1px 4px rgba(165, 42, 42, 1), 0 0 15px rgba(205, 133, 63, 0.6)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
                this.style.color = '';
                this.style.textShadow = '';
            }, 200);
            
            // 少し遅延してから画面遷移を開始
            setTimeout(() => {
                transitionToScreen(nextScreen);
            }, 200);
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
            width: 3px;
            height: 3px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.9) 0%, rgba(139, 0, 0, 0.3) 50%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
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
    
    // 定期的に光のエフェクトを生成
    setInterval(createLightEffect, 2000);
});