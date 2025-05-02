
const generateBtn = document.getElementById('generateBtn');
const emailContent = document.getElementById('emailContent');
const emailTone = document.getElementById('emailTone');
const includeEmojis = document.getElementById('includeEmojis');
const emojiSelectBtn = document.getElementById('emojiSelectBtn');
const emojiGrid = document.getElementById('emojiGrid');
const emojiAlignment = document.getElementById('emojiAlignment');
const emojiSelectGroup = document.getElementById('emojiSelectGroup');
const emojiAlignmentGroup = document.getElementById('emojiAlignmentGroup');
const contentError = document.getElementById('contentError');
const resultContainer = document.getElementById('resultContainer');
const subjectResults = document.getElementById('subjectResults');
const loadingIndicator = document.getElementById('loadingIndicator');
const copyAllBtn = document.getElementById('copyAllBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Show/hide emoji selection and alignment based on checkbox
includeEmojis.addEventListener('change', () => {
    const displayStyle = includeEmojis.checked ? 'block' : 'none';
    emojiSelectGroup.style.display = displayStyle;
    emojiAlignmentGroup.style.display = displayStyle;
    if (!includeEmojis.checked) {
        emojiGrid.classList.remove('active');
    }
});

// Toggle emoji grid visibility
emojiSelectBtn.addEventListener('click', () => {
    emojiGrid.classList.toggle('active');
});

// Handle emoji selection
const emojiOptions = document.querySelectorAll('.emoji-option');
emojiOptions.forEach(option => {
    option.addEventListener('click', () => {
        option.classList.toggle('selected');
    });
});

// Function to extract key themes from the content
function extractKeyThemes(content) {
    const words = content.toLowerCase().split(/\W+/).filter(word => word.length > 3);
    const commonWords = ['sale', 'discount', 'offer', 'new', 'update', 'event', 'product', 'service', 'free', 'exclusive'];
    const themes = words.filter(word => commonWords.includes(word));
    return themes.length > 0 ? themes : ['update'];
}

// Function to generate high-quality subject lines based on content, tone, emoji option, and alignment
function generateSubjectLines(content, tone, includeEmojis, selectedEmojis, emojiAlignment) {
    const themes = extractKeyThemes(content);
    const primaryTheme = themes[0];
    const contentSnippet = content.slice(0, 20).trim();

    // Tone-specific subject line templates without emojis
    const toneTemplates = {
        angry: [
            `Why Haven't You Fixed ${primaryTheme.toUpperCase()} Yet?!`,
            `Stop Ignoring This ${primaryTheme.toUpperCase()} Issue!`,
            `Unacceptable: ${primaryTheme} Needs Attention Now!`,
            `We’re Done Waiting for ${primaryTheme} Action!`,
            `Fix This ${primaryTheme} Problem Today!`
        ],
        appreciative: [
            `Thank You for Choosing Our ${primaryTheme}!`,
            `We Appreciate Your ${primaryTheme} Support!`,
            `Grateful for Your ${primaryTheme} Trust!`,
            `Thanks for Being Part of Our ${primaryTheme}!`,
            `Your ${primaryTheme} Loyalty Means Everything!`
        ],
        assertive: [
            `Take Control of ${primaryTheme} Now!`,
            `Don’t Miss This ${primaryTheme} Opportunity!`,
            `Act on ${primaryTheme} Before It’s Too Late!`,
            `Own Your ${primaryTheme} Today!`,
            `Step Up for This ${primaryTheme} Deal!`
        ],
        concerned: [
            `Are You Missing Out on ${primaryTheme}?`,
            `Worried About ${primaryTheme}? Let’s Fix It!`,
            `Don’t Let ${primaryTheme} Slip Away!`,
            `Concerned About ${primaryTheme}? We Can Help!`,
            `Is ${primaryTheme} Holding You Back?`
        ],
        confident: [
            `We’ve Got the Best ${primaryTheme} for You!`,
            `Trust Us for Your ${primaryTheme} Needs!`,
            `Your Perfect ${primaryTheme} Awaits!`,
            `Unbeatable ${primaryTheme} Just for You!`,
            `Excel with Our ${primaryTheme} Solution!`
        ],
        cooperative: [
            `Let’s Work Together on ${primaryTheme}!`,
            `Join Us for a ${primaryTheme} Partnership!`,
            `Collaborate on ${primaryTheme} Today!`,
            `Team Up for ${primaryTheme} Success!`,
            `We’re Here to Help with ${primaryTheme}!`
        ],
        curious: [
            `What’s New with ${primaryTheme}? Find Out!`,
            `Have You Seen This ${primaryTheme} Yet?`,
            `Guess What’s Happening with ${primaryTheme}?`,
            `Curious About ${primaryTheme}? Check This Out!`,
            `What’s Behind This ${primaryTheme} Update?`
        ],
        disapproving: [
            `This ${primaryTheme} Isn’t Good Enough!`,
            `We Expected Better from ${primaryTheme}!`,
            `Don’t Settle for This ${primaryTheme}!`,
            `Not Impressed with ${primaryTheme} – Fix It!`,
            `${primaryTheme} Needs to Step Up!`
        ],
        disheartening: [
            `Sad News About ${primaryTheme}…`,
            `We’re Sorry About This ${primaryTheme} Update`,
            `Disappointing ${primaryTheme} News Inside`,
            `${primaryTheme} Let Us Down This Time`,
            `Feeling Down About ${primaryTheme}?`
        ],
        egocentric: [
            `All About Your ${primaryTheme} Needs!`,
            `You Deserve This ${primaryTheme}!`,
            `Your ${primaryTheme}, Your Way!`,
            `This ${primaryTheme} Is Just for You!`,
            `Focus on Your ${primaryTheme} Today!`
        ],
        empathetic: [
            `We Understand Your ${primaryTheme} Struggles`,
            `Here for You with ${primaryTheme} Support`,
            `We Feel You: ${primaryTheme} Help Inside`,
            `Your ${primaryTheme} Pain, Our Solution`,
            `We Care About Your ${primaryTheme} Needs`
        ],
        encouraging: [
            `You’ve Got This: ${primaryTheme} Awaits!`,
            `Keep Going with ${primaryTheme} Support!`,
            `We Believe in Your ${primaryTheme} Journey!`,
            `Stay Strong with ${primaryTheme} Help!`,
            `You Can Do It: ${primaryTheme} Boost!`
        ],
        enthusiastic: [
            `We’re Thrilled About ${primaryTheme}!`,
            `So Excited for This ${primaryTheme}!`,
            `Can’t Wait to Share ${primaryTheme}!`,
            `Big ${primaryTheme} News to Celebrate!`,
            `Let’s Cheer for ${primaryTheme}!`
        ],
        excited: [
            `Wow! New ${primaryTheme} Just Dropped!`,
            `Get Pumped for ${primaryTheme}!`,
            `Thrilling ${primaryTheme} Update Inside!`,
            `You’ll Love This ${primaryTheme} News!`,
            `Exciting ${primaryTheme} Awaits You!`
        ],
        friendly: [
            `Hey There! Check Out ${primaryTheme}!`,
            `A Little ${primaryTheme} Surprise for You!`,
            `Hi! Let’s Talk About ${primaryTheme}!`,
            `Your Friend with ${primaryTheme} Updates!`,
            `Hello! See What’s New with ${primaryTheme}!`
        ],
        funny: [
            `Don’t Laugh, But ${primaryTheme} Is Here!`,
            `Oops, ${primaryTheme} Did It Again!`,
            `This ${primaryTheme} Will Crack You Up!`,
            `Haha, ${primaryTheme} Just Got Better!`,
            `Silly ${primaryTheme} News for You!`
        ],
        joyful: [
            `Pure Happiness: ${primaryTheme} Inside!`,
            `Celebrate with ${primaryTheme} Today!`,
            `So Much Joy in This ${primaryTheme}!`,
            `Feel Good with ${primaryTheme} News!`,
            `Smiles All Around with ${primaryTheme}!`
        ],
        neutral: [
            `Here’s Your ${primaryTheme} Update`,
            `New ${primaryTheme} Information Inside`,
            `Check Out ${primaryTheme} Details`,
            `Your ${primaryTheme} News Is Here`,
            `Latest on ${primaryTheme} for You`
        ],
        optimistic: [
            `Bright Days Ahead with ${primaryTheme}!`,
            `Good Vibes Only: ${primaryTheme} News!`,
            `The Future Looks Great with ${primaryTheme}!`,
            `Hopeful ${primaryTheme} Update for You!`,
            `Positive ${primaryTheme} News Inside!`
        ],
        regretful: [
            `We’re Sorry About ${primaryTheme}…`,
            `Apologies for ${primaryTheme} Issues`,
            `We Regret This ${primaryTheme} Delay`,
            `Our Mistake on ${primaryTheme} – Fixed!`,
            `Wish We Did Better with ${primaryTheme}`
        ],
        sad: [
            `Sad News About ${primaryTheme}…`,
            `We’re Heartbroken Over ${primaryTheme}`,
            `Tough Day for ${primaryTheme} Updates`,
            `Feeling Blue About ${primaryTheme}`,
            `Sorry to Share This ${primaryTheme} News`
        ],
        serious: [
            `Important ${primaryTheme} Update Inside`,
            `Critical ${primaryTheme} Information`,
            `Please Read: ${primaryTheme} Details`,
            `Serious ${primaryTheme} News for You`,
            `Key ${primaryTheme} Update to Understand`
        ],
        surprised: [
            `Shockingly Good ${primaryTheme} News!`,
            `You Won’t Believe This ${primaryTheme}!`,
            `Unexpected ${primaryTheme} Update!`,
            `Wow, ${primaryTheme} Just Happened!`,
            `Surprise! ${primaryTheme} Is Here!`
        ],
        unassuming: [
            `A Simple ${primaryTheme} Update for You`,
            `Quietly Sharing ${primaryTheme} News`,
            `No Fuss: ${primaryTheme} Details Inside`,
            `Humble ${primaryTheme} Update Here`,
            `Just a Small ${primaryTheme} Note`
        ],
        worried: [
            `Are We Too Late for ${primaryTheme}?`,
            `Nervous About ${primaryTheme}? See This!`,
            `Worried About ${primaryTheme} Issues?`,
            `Don’t Panic: ${primaryTheme} Update!`,
            `Anxiety Over ${primaryTheme}? Let’s Fix It!`
        ]
    };

    // Generate subject lines
    let subjectLines = (toneTemplates[tone] || toneTemplates['neutral']).map(line => {
        let finalLine = line;
        if (finalLine.length > 60) {
            finalLine = finalLine.slice(0, 57) + '...';
        }
        return finalLine;
    });

    // Add selected emojis based on alignment if the option is checked
    if (includeEmojis && selectedEmojis.length > 0) {
        const emojiString = selectedEmojis.join(' ');
        const emojiLength = emojiString.length;

        subjectLines = subjectLines.map(line => {
            const words = line.split(' ');
            const totalLength = line.length + emojiLength + 1;

            if (totalLength > 60) {
                // Truncate the line to fit emojis and ensure total length <= 60
                line = line.slice(0, 60 - emojiLength - 4) + '...';
            }

            if (emojiAlignment === 'start') {
                return `${emojiString} ${line}`;
            } else if (emojiAlignment === 'end') {
                return `${line} ${emojiString}`;
            } else { // center
                const words = line.split(' ');
                const midIndex = Math.floor(words.length / 2);
                words.splice(midIndex, 0, emojiString);
                let finalLine = words.join(' ');
                if (finalLine.length > 60) {
                    finalLine = finalLine.slice(0, 57) + '...';
                }
                return finalLine;
            }
        });
    }

    return subjectLines.slice(0, 5);
}

generateBtn.addEventListener('click', () => {
    if (!emailContent.value.trim()) {
        contentError.style.display = 'block';
        return;
    }
    contentError.style.display = 'none';

    // Show loading state
    generateBtn.classList.add('loading');
    loadingIndicator.style.display = 'flex';
    resultContainer.style.display = 'none';

    // Get selected emojis and alignment
    const selectedEmojis = Array.from(emojiOptions)
        .filter(option => option.classList.contains('selected'))
        .map(option => option.getAttribute('data-emoji'));
    const alignment = emojiAlignment.value;

    // Simulate API call
    setTimeout(() => {
        const subjectLines = generateSubjectLines(emailContent.value, emailTone.value, includeEmojis.checked, selectedEmojis, alignment);
        subjectResults.innerHTML = subjectLines.map(line => `
            <div class="subject-line">
                <span class="subject-text">${line}</span>
                <button class="btn-copy-single" onclick="copyToClipboard('${line}')">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
        `).join('');

        resultContainer.style.display = 'block';
        generateBtn.classList.remove('loading');
        loadingIndicator.style.display = 'none';
    }, 1000);
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Subject line copied!');
    });
}

copyAllBtn.addEventListener('click', () => {
    const allLines = Array.from(subjectResults.querySelectorAll('.subject-text'))
        .map(span => span.textContent)
        .join('\n');
    navigator.clipboard.writeText(allLines).then(() => {
        alert('All subject lines copied!');
    });
});

downloadBtn.addEventListener('click', () => {
    const allLines = Array.from(subjectResults.querySelectorAll('.subject-text'))
        .map(span => span.textContent)
        .join('\n');
    const blob = new Blob([allLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subject_lines.txt';
    a.click();
    URL.revokeObjectURL(url);
});
