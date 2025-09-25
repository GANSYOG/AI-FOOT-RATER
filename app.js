class AIFootRater {
    constructor() {
        this.currentPersonality = 'witty';
        this.currentImage = null;
        this.currentResult = null;
        this.loadingMessageIndex = 0;
        this.loadingInterval = null;
        
        // Data from the application data JSON
        this.personalities = {
            witty: { name: "Witty", description: "World-renowned podiatry aesthetician", icon: "✨", color: "#6366f1" },
            sarcastic: { name: "Sarcastic", description: "Unimpressed art critic", icon: "🎭", color: "#f59e0b" },
            roast: { name: "Roast", description: "Ruthless comedy roaster", icon: "🔥", color: "#ef4444" }
        };
        
        this.loadingMessages = [
            "Consulting the toe-tome...",
            "Analyzing arch-itecture...",
            "Measuring sole quality...",
            "Assessing digit dynamics...",
            "Calculating podiatric potential...",
            "Reviewing nail narratives...",
            "Examining heel harmony...",
            "Studying skin stories...",
            "Investigating ankle aesthetics...",
            "Evaluating overall elegance..."
        ];
        
        this.scoreDescriptions = {
            1: "A biological catastrophe",
            2: "Needs immediate intervention", 
            3: "Room for improvement",
            4: "Below average specimen",
            5: "Perfectly mediocre",
            6: "Approaching acceptability",
            7: "Notably nice",
            8: "Impressively attractive",
            9: "Exceptionally exquisite",
            10: "Podiatric perfection"
        };
        
        this.critiques = {
            witty: {
                high: [
                    "Darling, these feet are absolutely divine! A masterpiece of podiatric perfection.",
                    "My dear, you've been blessed with feet that belong in a Renaissance painting!",
                    "Exquisite! These feet could grace the finest red carpets of the world.",
                    "Magnificent specimens! I detect notes of elegance with a finish of pure sophistication."
                ],
                medium: [
                    "Charming feet with delightful potential, though a little refinement wouldn't go amiss.",
                    "Lovely foundation, dear. With proper care, these could be truly spectacular.",
                    "Pleasant specimens with character. A few adjustments and you'll be strutting in style.",
                    "Decent examples of the human foot, with room to elevate to greatness."
                ],
                low: [
                    "Oh my... these feet have seen some adventures, haven't they?",
                    "Bless your heart, but these feet need some serious TLC and perhaps a miracle.",
                    "Well, they certainly have... personality. And that's something, I suppose.",
                    "These feet tell a story, though it might be a cautionary tale."
                ]
            },
            sarcastic: {
                high: [
                    "Well, well... I suppose these aren't completely offensive to the eye.",
                    "Congratulations, you've managed to avoid a podiatric disaster. How remarkable.",
                    "I'm genuinely shocked. These feet don't make me want to run screaming.",
                    "Against all odds, these feet have achieved something resembling acceptability."
                ],
                medium: [
                    "How wonderfully... average. The epitome of foot mediocrity.",
                    "These feet are about as exciting as watching paint dry, but at least they're symmetrical.",
                    "Ah yes, the classic 'meh' foot. Nothing to write home about.",
                    "These feet won't win any contests, but they won't traumatize anyone either."
                ],
                low: [
                    "Oh dear... someone clearly skipped foot care day. And week. And year.",
                    "I've seen roadkill with better aesthetic appeal than these specimens.",
                    "These feet are what nightmares are made of. I need therapy now.",
                    "Congratulations, you've achieved what I thought was impossible: negative foot appeal."
                ]
            },
            roast: {
                high: [
                    "Damn! These feet actually don't suck! That's... unexpected.",
                    "Holy shit, you actually have decent feet! Who would have thought?",
                    "Well I'll be damned, these feet aren't completely horrifying!",
                    "Against all fucking odds, these feet are actually pretty nice!"
                ],
                medium: [
                    "These feet are more basic than a pumpkin spice latte in October.",
                    "Your feet have all the personality of plain toast. Dry plain toast.",
                    "These feet are the human equivalent of beige wallpaper.",
                    "Congratulations, your feet are aggressively mediocre!"
                ],
                low: [
                    "Jesus Christ, what the hell happened to these poor feet?!",
                    "These feet look like they lost a fight with a lawnmower and came back for more.",
                    "Holy shit, I've seen car accidents that looked better than these feet.",
                    "Your feet are so ugly, they could make a mortician cry."
                ]
            }
        };

        this.detailedAnalysis = {
            witty: {
                archAnalysis: [
                    "Your arches display a delightful curvature that would make ancient Roman architects weep with joy.",
                    "These arches have character, though perhaps they're telling a slightly different story than intended.",
                    "A fascinating architectural study in structural... creativity.",
                    "Your arches demonstrate the triumph of functionality over form, which is... something."
                ],
                toeAlignment: [
                    "Your toes are arranged in perfect harmony, like a well-conducted symphony.",
                    "These toes show promise, though a little choreography wouldn't hurt.",
                    "Your toes have personality - they're certainly not afraid to be individuals.",
                    "Each toe seems to be on its own personal journey, which is... adventurous."
                ],
                skinCondition: [
                    "Your skin has that enviable glow that suggests excellent self-care.",
                    "Decent skin quality with room for that extra touch of pampering.",
                    "Your skin tells stories of a life well-lived, if not well-moisturized.",
                    "This skin has seen things, and it's not afraid to show it."
                ]
            },
            sarcastic: {
                archAnalysis: [
                    "Oh look, arches that actually arch. How wonderfully conventional.",
                    "Your arches are doing... something. I suppose that's technically correct.",
                    "These arches have given up on life, and honestly, who can blame them?",
                    "What arches? I see only the architectural equivalent of soggy toast."
                ],
                toeAlignment: [
                    "Your toes are aligned about as well as stars during a solar eclipse.",
                    "These toes are playing it safe with the 'chaotic neutral' approach.",
                    "Your toes have achieved a level of disorder that's almost artistic.",
                    "It's like your toes held a meeting and decided anarchy was the way forward."
                ],
                skinCondition: [
                    "Your skin has that lived-in quality that screams 'I've given up.'",
                    "This skin condition is perfectly adequate, which is the highest praise I can muster.",
                    "Your skin looks like it's been through a cheese grater. A rusty one.",
                    "This skin has more texture than a Jackson Pollock painting."
                ]
            },
            roast: {
                archAnalysis: [
                    "Your arches are flatter than week-old soda and twice as disappointing.",
                    "These arches have less support than a broken lawn chair.",
                    "Your arches collapsed harder than the housing market in 2008.",
                    "What arches? You've got more like architectural suggestions."
                ],
                toeAlignment: [
                    "Your toes look like they're trying to escape from each other.",
                    "These toes are more crooked than a politician's promises.",
                    "Your toe alignment is so bad, it makes drunk people look coordinated.",
                    "Your toes look like they were arranged by someone having a seizure."
                ],
                skinCondition: [
                    "Your skin looks like it was attacked by an angry cheese grater.",
                    "This skin condition has more issues than a tabloid magazine.",
                    "Your skin looks like it's been marinating in sandpaper.",
                    "This skin has more problems than a soap opera."
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadHistory();
    }
    
    bindEvents() {
        // Personality selection
        document.querySelectorAll('.personality-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectPersonality(btn.dataset.personality);
            });
        });
        
        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFile(files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFile(e.target.files[0]);
            }
        });
        
        // Action buttons
        document.getElementById('shareBtn').addEventListener('click', () => this.shareResult());
        document.getElementById('newRatingBtn').addEventListener('click', () => this.resetApp());
        
        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadShare());
        
        // Modal overlay click to close
        document.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());
    }
    
    selectPersonality(personality) {
        this.currentPersonality = personality;
        
        // Update UI
        document.querySelectorAll('.personality-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-personality="${personality}"]`).classList.add('active');
    }
    
    handleFile(file) {
        // Validate file type
        if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
            alert('Please select a valid image file (JPG, PNG, or WEBP)');
            return;
        }
        
        // Resize image
        this.resizeImage(file, (resizedFile) => {
            this.currentImage = resizedFile;
            this.processImage();
        });
    }
    
    resizeImage(file, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            const maxSize = 1024;
            let { width, height } = img;
            
            // Calculate new dimensions
            if (width > height) {
                if (width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(callback, file.type, 0.8);
        };
        
        img.src = URL.createObjectURL(file);
    }
    
    processImage() {
        this.showLoading();
        
        // Simulate AI processing delay
        setTimeout(() => {
            const result = this.generateMockAnalysis();
            this.showResults(result);
            this.saveToHistory(result);
        }, 3000 + Math.random() * 2000); // 3-5 seconds
    }
    
    showLoading() {
        // Hide upload section
        document.querySelector('.upload-section').classList.add('hidden');
        
        // Show loading section
        const loadingSection = document.getElementById('loadingSection');
        loadingSection.classList.remove('hidden');
        
        // Start rotating loading messages
        this.startLoadingMessages();
    }
    
    startLoadingMessages() {
        const messageElement = document.getElementById('loadingMessage');
        this.loadingMessageIndex = 0;
        
        this.loadingInterval = setInterval(() => {
            messageElement.textContent = this.loadingMessages[this.loadingMessageIndex];
            this.loadingMessageIndex = (this.loadingMessageIndex + 1) % this.loadingMessages.length;
        }, 800);
    }
    
    stopLoadingMessages() {
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
        }
    }
    
    generateMockAnalysis() {
        const score = Math.floor(Math.random() * 10) + 1;
        const personality = this.currentPersonality;
        
        let critiqueLevel;
        if (score >= 8) critiqueLevel = 'high';
        else if (score >= 5) critiqueLevel = 'medium';
        else critiqueLevel = 'low';
        
        const overallCritique = this.critiques[personality][critiqueLevel][
            Math.floor(Math.random() * this.critiques[personality][critiqueLevel].length)
        ];
        
        const archAnalysis = this.detailedAnalysis[personality].archAnalysis[
            Math.floor(Math.random() * this.detailedAnalysis[personality].archAnalysis.length)
        ];
        
        const toeAlignment = this.detailedAnalysis[personality].toeAlignment[
            Math.floor(Math.random() * this.detailedAnalysis[personality].toeAlignment.length)
        ];
        
        const skinCondition = this.detailedAnalysis[personality].skinCondition[
            Math.floor(Math.random() * this.detailedAnalysis[personality].skinCondition.length)
        ];
        
        return {
            score,
            personality,
            overallCritique,
            archAnalysis,
            toeAlignment,
            skinCondition,
            timestamp: new Date(),
            imageData: this.currentImage
        };
    }
    
    showResults(result) {
        this.currentResult = result;
        
        // Stop loading messages
        this.stopLoadingMessages();
        
        // Hide loading section
        document.getElementById('loadingSection').classList.add('hidden');
        
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.remove('hidden');
        
        // Animate score gauge
        this.animateScoreGauge(result.score);
        
        // Update content
        document.getElementById('scoreDescription').textContent = this.scoreDescriptions[result.score];
        document.getElementById('overallCritique').textContent = result.overallCritique;
        document.getElementById('archAnalysis').textContent = result.archAnalysis;
        document.getElementById('toeAlignment').textContent = result.toeAlignment;
        document.getElementById('skinCondition').textContent = result.skinCondition;
    }
    
    animateScoreGauge(targetScore) {
        const canvas = document.getElementById('scoreGauge');
        const ctx = canvas.getContext('2d');
        const scoreNumberEl = document.getElementById('scoreNumber');
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        let currentScore = 0;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            currentScore = easeOutCubic * targetScore;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = '#e5e5e5';
            ctx.lineWidth = 8;
            ctx.stroke();
            
            // Draw progress arc
            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + (2 * Math.PI * currentScore) / 10;
            
            let color;
            if (targetScore >= 8) color = '#10b981'; // green
            else if (targetScore >= 5) color = '#f59e0b'; // yellow
            else color = '#ef4444'; // red
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.strokeStyle = color;
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            // Update score number
            scoreNumberEl.textContent = Math.floor(currentScore);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    resetApp() {
        // Hide results
        document.getElementById('resultsSection').classList.add('hidden');
        
        // Show upload section
        document.querySelector('.upload-section').classList.remove('hidden');
        
        // Reset file input
        document.getElementById('fileInput').value = '';
        
        // Reset current data
        this.currentImage = null;
        this.currentResult = null;
    }
    
    shareResult() {
        if (!this.currentResult || !this.currentImage) return;
        
        this.generateShareImage();
        document.getElementById('shareModal').classList.remove('hidden');
    }
    
    generateShareImage() {
        const canvas = document.getElementById('shareCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 400;
        canvas.height = 600;
        
        // Create image from current image data
        const img = new Image();
        img.onload = () => {
            // Clear canvas
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw foot image
            const imgHeight = 300;
            const imgWidth = (img.width / img.height) * imgHeight;
            const imgX = (canvas.width - imgWidth) / 2;
            ctx.drawImage(img, imgX, 50, imgWidth, imgHeight);
            
            // Draw score circle
            const circleX = canvas.width / 2;
            const circleY = 400;
            const circleRadius = 50;
            
            // Background circle
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
            ctx.fillStyle = '#f3f4f6';
            ctx.fill();
            
            // Score circle
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius - 5, 0, 2 * Math.PI);
            let scoreColor;
            if (this.currentResult.score >= 8) scoreColor = '#10b981';
            else if (this.currentResult.score >= 5) scoreColor = '#f59e0b';
            else scoreColor = '#ef4444';
            ctx.fillStyle = scoreColor;
            ctx.fill();
            
            // Score text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.currentResult.score, circleX, circleY + 12);
            
            // Critique text
            ctx.fillStyle = '#374151';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            
            // Wrap text
            const maxWidth = canvas.width - 40;
            const words = this.currentResult.overallCritique.split(' ');
            let line = '';
            let y = 480;
            
            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                
                if (testWidth > maxWidth && i > 0) {
                    ctx.fillText(line, circleX, y);
                    line = words[i] + ' ';
                    y += 20;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, circleX, y);
            
            // Watermark
            ctx.fillStyle = '#9ca3af';
            ctx.font = '12px Arial';
            ctx.fillText('AI Foot Rater', circleX, 580);
        };
        
        img.src = URL.createObjectURL(this.currentImage);
    }
    
    downloadShare() {
        const canvas = document.getElementById('shareCanvas');
        const link = document.createElement('a');
        link.download = `foot-rating-${this.currentResult.score}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }
    
    closeModal() {
        document.getElementById('shareModal').classList.add('hidden');
    }
    
    saveToHistory(result) {
        const history = JSON.parse(localStorage.getItem('footRaterHistory') || '[]');
        
        // Convert image to base64 for storage
        const reader = new FileReader();
        reader.onload = (e) => {
            const historyEntry = {
                id: Date.now(),
                score: result.score,
                personality: result.personality,
                overallCritique: result.overallCritique,
                archAnalysis: result.archAnalysis,
                toeAlignment: result.toeAlignment,
                skinCondition: result.skinCondition,
                timestamp: result.timestamp,
                imageData: e.target.result
            };
            
            history.unshift(historyEntry);
            
            // Keep only last 20 entries
            if (history.length > 20) {
                history.splice(20);
            }
            
            localStorage.setItem('footRaterHistory', JSON.stringify(history));
            this.displayHistory();
        };
        
        reader.readAsDataURL(result.imageData);
    }
    
    loadHistory() {
        this.displayHistory();
    }
    
    displayHistory() {
        const history = JSON.parse(localStorage.getItem('footRaterHistory') || '[]');
        const historyContainer = document.getElementById('historyContainer');
        const historyEmpty = document.getElementById('historyEmpty');
        const historyList = document.getElementById('historyList');
        
        if (history.length === 0) {
            historyEmpty.style.display = 'block';
            historyList.style.display = 'none';
        } else {
            historyEmpty.style.display = 'none';
            historyList.style.display = 'block';
            
            historyList.innerHTML = history.map(entry => `
                <div class="history-item" data-id="${entry.id}">
                    <img src="${entry.imageData}" alt="Foot rating" class="history-thumbnail">
                    <div class="history-content">
                        <div class="history-header">
                            <div class="history-score">${entry.score}/10</div>
                            <div class="history-date">${new Date(entry.timestamp).toLocaleDateString()}</div>
                        </div>
                        <div class="history-critique">${entry.overallCritique}</div>
                        <div class="history-personality">
                            ${this.personalities[entry.personality].icon} ${this.personalities[entry.personality].name}
                        </div>
                    </div>
                    <div class="history-actions">
                        <button class="delete-btn" onclick="app.deleteHistoryItem(${entry.id})">Delete</button>
                    </div>
                </div>
            `).join('');
            
            // Add click handlers for viewing history items
            document.querySelectorAll('.history-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('delete-btn')) {
                        const id = parseInt(item.dataset.id);
                        this.viewHistoryItem(id);
                    }
                });
            });
        }
    }
    
    viewHistoryItem(id) {
        const history = JSON.parse(localStorage.getItem('footRaterHistory') || '[]');
        const entry = history.find(item => item.id === id);
        
        if (entry) {
            // Convert base64 back to blob
            fetch(entry.imageData)
                .then(res => res.blob())
                .then(blob => {
                    this.currentImage = blob;
                    this.currentResult = entry;
                    this.showResults(entry);
                });
        }
    }
    
    deleteHistoryItem(id) {
        if (confirm('Are you sure you want to delete this rating?')) {
            const history = JSON.parse(localStorage.getItem('footRaterHistory') || '[]');
            const filteredHistory = history.filter(item => item.id !== id);
            localStorage.setItem('footRaterHistory', JSON.stringify(filteredHistory));
            this.displayHistory();
        }
    }
}

// Initialize the app
const app = new AIFootRater();