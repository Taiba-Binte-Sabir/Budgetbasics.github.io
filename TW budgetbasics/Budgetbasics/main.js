  const feedbackForm = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();

        successMessage.style.display = "block";

        feedbackForm.reset();

    });

     const menuBtn = document.getElementById("menuBtn");
        const navLinks = document.getElementById("navLinks");

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            menuBtn.classList.toggle("active");

        });


        
/* ===== SEARCH SIDEBAR FUNCTIONALITY ===== */

const openSearchBtn = document.getElementById("openSearchBtn");
const openSearchInput = document.getElementById("openSearchInput");
const searchSidebar = document.getElementById("searchSidebar");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearchBtn = document.getElementById("closeSearchBtn");
const sidebarSearch = document.getElementById("sidebarSearch");
const searchForm = document.getElementById("searchForm");
const sortResults = document.getElementById("sortResults");
const searchResults = document.getElementById("searchResults");
const searchResultCount = document.getElementById("searchResultCount");
const clearSearch = document.getElementById("clearSearch");


const searchData = [
  {
    title: "Budgeting Basics",
    description: "Learn income, expenses, needs, wants, budgeting and saving basics.",
    id: "#budgetingbasics",
    category: ["budgeting", "saving", "needs", "expenses"],
    keywords: "budget money income student budget saving basics",
    date: 10
  },
  {
    title: "Needs vs Wants",
    description: "Understand the difference between needs and wants and manage spending.",
    id: "#needswants",
    category: ["needs", "budgeting"],
    keywords: "needs wants spending essentials expenses",
    date: 9
  },
  {
    title: "50-30-20 Rule",
    description: "Calculate how to divide your income into needs, wants and savings.",
    id: "#rule503020",
    category: ["budgeting", "saving", "needs", "goals"],
    keywords: "50 30 20 rule calculator income saving budget",
    date: 8
  },
  {
    title: "Savings Goals",
    description: "Set a savings target and calculate how long it takes to reach it.",
    id: "#savings",
    category: ["saving", "goals"],
    keywords: "savings goals saving target money future",
    date: 7
  },
  {
    title: "Expense Planner",
    description: "Track expenses, manage spending and calculate your remaining balance.",
    id: "#expense",
    category: ["expenses", "budgeting"],
    keywords: "expense planner spending costs balance money",
    date: 6
  },
  {
    title: "Money Mistakes",
    description: "Learn about common money mistakes and how to avoid them.",
    id: "#mistakes",
    category: ["budgeting", "saving"],
    keywords: "money mistakes overspending spending habits",
    date: 5
  },
  {
    title: "Infographics",
    description: "Explore visual budgeting tips, saving facts and money guides.",
    id: "#infographics",
    category: ["infographics", "budgeting", "saving"],
    keywords: "infographics visuals tips facts saving money",
    date: 4
  },
  {
    title: "AI Chatbot",
    description: "Ask questions about budgeting, savings and personal finance.",
    id: "#chatbot",
    category: ["budgeting", "saving"],
    keywords: "AI chatbot questions help finance",
    date: 3
  },
  {
    title: "Feedback",
    description: "Share your feedback and suggestions about BudgetBasics.",
    id: "#feedback",
    category: [],
    keywords: "feedback suggestions review",
    date: 2
  },
  {
    title: "Contact Us",
    description: "Get in touch with the BudgetBasics team.",
    id: "#feedback",
    category: [],
    keywords: "contact support help email",
    date: 1
  }
];


function openSearchSidebar() {
  searchSidebar.classList.add("active");
  searchOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  sidebarSearch.focus();
  renderSearchResults();
}

function closeSearchSidebar() {
  searchSidebar.classList.remove("active");
  searchOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

openSearchBtn.addEventListener("click", openSearchSidebar);
openSearchInput.addEventListener("click", openSearchSidebar);

closeSearchBtn.addEventListener("click", closeSearchSidebar);
searchOverlay.addEventListener("click", closeSearchSidebar);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSearchSidebar();
  }
});


function renderSearchResults() {
  const query = sidebarSearch.value.trim().toLowerCase();

  const selectedTopics = Array.from(
    document.querySelectorAll(".filter-option input:checked")
  ).map(function (checkbox) {
    return checkbox.value;
  });

  let results = searchData.filter(function (item) {

    const searchableText = (
      item.title + " " +
      item.description + " " +
      item.keywords
    ).toLowerCase();

    const matchesSearch =
      query === "" || searchableText.includes(query);

    const matchesTopic =
      selectedTopics.length === 0 ||
      selectedTopics.some(function (topic) {
        return item.category.includes(topic);
      });

    return matchesSearch && matchesTopic;
  });


  const sortValue = sortResults.value;

  if (sortValue === "newest") {
    results.sort(function (a, b) {
      return b.date - a.date;
    });
  }

  if (sortValue === "az") {
    results.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }

  if (sortValue === "relevant") {
    results.sort(function (a, b) {

      function getScore(item) {
        if (query === "") return 0;

        const title = item.title.toLowerCase();
        const keywords = item.keywords.toLowerCase();

        let score = 0;

        if (title.includes(query)) score += 5;
        if (keywords.includes(query)) score += 3;
        if (item.description.toLowerCase().includes(query)) {
          score += 2;
        }

        return score;
      }

      return getScore(b) - getScore(a);
    });
  }


  searchResults.innerHTML = "";

  searchResultCount.textContent =
    results.length + (results.length === 1
      ? " result found"
      : " results found");


  if (results.length === 0) {
    searchResults.innerHTML =
      '<div class="no-search-results">' +
      '<i class="fa-solid fa-magnifying-glass"></i>' +
      '<p>No matching content found.</p>' +
      '<p>Try another keyword or clear your filters.</p>' +
      '</div>';

    return;
  }


  results.forEach(function (item) {
    const card = document.createElement("a");

    card.className = "search-result-card";
    card.href = item.id;

    const title = document.createElement("h4");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.appendChild(title);
    card.appendChild(description);

    searchResults.appendChild(card);
  });
}


searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderSearchResults();
});

sortResults.addEventListener("change", renderSearchResults);

document.querySelectorAll(".filter-option input").forEach(
  function (checkbox) {
    checkbox.addEventListener("change", renderSearchResults);
  }
);

sidebarSearch.addEventListener("input", renderSearchResults);


clearSearch.addEventListener("click", function () {
  sidebarSearch.value = "";
  sortResults.value = "newest";

  document.querySelectorAll(".filter-option input").forEach(
    function (checkbox) {
      checkbox.checked = false;
    }
  );

  renderSearchResults();
});


document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    const sections = document.querySelectorAll(
        "#budgetingbasics, #needswants, #rule503020, #savings, #expense, #mistakes, #chatbot, #feedback, #infographics"
    );

    function highlightActiveSection() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop <= 120) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightActiveSection);

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    highlightActiveSection();

});

const themeToggle = document.getElementById("themeToggle");

function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);

    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i><span>Light Mode</span>'
        : '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';

    localStorage.setItem("budgetBasicsTheme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("budgetBasicsTheme");

setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark-theme");
    setTheme(isDark);
});
  /* ---- AI Chatbot Assistant: rule-based keyword matching ---- */
  const bbTopics = [
    { keywords:['need'], answer:"A need is something essential to live and function — rent or hostel fees, food, transport, utilities, and study materials. If skipping it would cause a real problem, it's a need." },
    { keywords:['want'], answer:"A want is something nice to have but not essential — streaming subscriptions, eating out, games, or new clothes you don't need yet. Wants can usually wait a day or two." },
    { keywords:['save','saving','savings'], answer:"A common guideline is to save at least 20% of your income — that's the '20' in the 50-30-20 rule. If that feels like a lot, start with 10% and increase it as you get comfortable." },
    { keywords:['overspend','overspending','spend too much','control spending'], answer:"To avoid overspending: track every expense for a week, wait 24 hours before non-essential purchases, and set a weekly limit for your 'wants' category." },
    { keywords:['50-30-20','50/30/20','50 30 20','budget rule','budgeting rule'], answer:"The 50-30-20 rule suggests splitting your income as 50% needs, 30% wants, and 20% savings. It's an educational starting guideline, not a fixed law — you can adjust it to fit your situation." },
    { keywords:['subscription'], answer:"Review your subscriptions every month. If something has gone unused for 30+ days, cancel it — small recurring charges like these add up faster than they feel like they should." },
    { keywords:['goal'], answer:"To set a savings goal: pick a target amount and a monthly contribution, then divide the target by your monthly saving amount to estimate how many months it will take." },
    { keywords:['expense','track spending','tracking'], answer:"Track expenses by category — food, transport, education, entertainment, and so on — so you can see where money actually goes, not just where you assume it goes." },
    { keywords:['budget'], answer:"A budget is simply a plan for your income: how much goes to needs, how much to wants, and how much to savings, ideally decided before the month starts, not after the money's gone." },
    { keywords:['mistake'], answer:"Common student money mistakes include impulse buying, ignoring small daily expenses, late bill payments, and paying for unused subscriptions. Awareness is usually the first fix." },
  ];

  function bbFindAnswer(question){
    const q = question.toLowerCase();
    for(const topic of bbTopics){
      if(topic.keywords.some(k => q.includes(k))){
        return topic.answer;
      }
    }
    return "I can only help with a fixed set of educational topics right now — try asking about needs vs wants, savings, the 50-30-20 rule, overspending, subscriptions, goals, or common money mistakes.";
  }

  function bbAddMessage(text, sender){
    const log = document.getElementById('chatLog');
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + sender;
    const avatar = document.createElement('span');
    avatar.className = 'chat-avatar';
    avatar.textContent = sender === 'bot' ? '🪙' : '🙂';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    msg.appendChild(avatar);
    msg.appendChild(bubble);
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  const bbChatForm = document.getElementById('chatForm');
  const bbChatInput = document.getElementById('chatInput');

  bbChatForm.addEventListener('submit', function(e){
    e.preventDefault();
    const q = bbChatInput.value.trim();
    if(!q) return;
    bbAddMessage(q, 'user');
    bbChatInput.value = '';
    setTimeout(() => bbAddMessage(bbFindAnswer(q), 'bot'), 250);
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      bbChatInput.value = chip.getAttribute('data-q');
      bbChatForm.dispatchEvent(new Event('submit'));
    });
  });

  const nwItems = [
  { label:"Grocery shopping for the week", answer:"need", why:"Food is essential to function — this is a need." },
  { label:"Latest video game release", answer:"want", why:"Entertainment is enjoyable but not essential — this is a want." },
  { label:"Monthly bus pass to college", answer:"need", why:"Getting to class reliably is essential — this is a need." },
  { label:"A third streaming subscription", answer:"want", why:"One subscription might already be a stretch; a third is almost always optional." },
  { label:"Required textbook for a course", answer:"need", why:"Course materials needed to study are a need." },
  { label:"New sneakers when your current ones still work", answer:"want", why:"If your current shoes are fine, new ones are a want, not a need." },
];
let nwIndex = 0, nwAnswered = false;

function nwLoadItem(){
  nwAnswered = false;
  document.getElementById('nwItemLabel').textContent = nwItems[nwIndex].label;
  document.getElementById('nwProgress').textContent = (nwIndex+1) + ' / ' + nwItems.length;
  document.getElementById('nwFeedback').textContent = '';
  document.getElementById('nwFeedback').className = 'nw-feedback';
  document.getElementById('nwNextBtn').style.display = 'none';
  document.getElementById('nwNeedBtn').disabled = false;
  document.getElementById('nwWantBtn').disabled = false;
}

function nwAnswer(choice){
  if(nwAnswered) return;
  nwAnswered = true;
  const item = nwItems[nwIndex];
  const correct = choice === item.answer;
  const fb = document.getElementById('nwFeedback');
  fb.textContent = (correct ? "Correct — " : "Not quite — ") + item.why;
  fb.className = 'nw-feedback ' + (correct ? 'nw-correct' : 'nw-incorrect');
  document.getElementById('nwNeedBtn').disabled = true;
  document.getElementById('nwWantBtn').disabled = true;
  document.getElementById('nwNextBtn').style.display = 'inline-block';
}

document.getElementById('nwNeedBtn').addEventListener('click', () => nwAnswer('need'));
document.getElementById('nwWantBtn').addEventListener('click', () => nwAnswer('want'));
document.getElementById('nwNextBtn').addEventListener('click', () => {
  nwIndex = (nwIndex + 1) % nwItems.length;
  nwLoadItem();
});
nwLoadItem();

document.querySelectorAll('.bb-opt').forEach(opt => {
  opt.addEventListener('click', function(){
    const options = document.querySelectorAll('.bb-opt');
    const feedback = document.getElementById('bbCheckFeedback');
    const isCorrect = this.getAttribute('data-correct') === 'true';

    options.forEach(o => o.disabled = true);
    this.classList.add(isCorrect ? 'bb-right' : 'bb-wrong');

    if(!isCorrect){
      options.forEach(o => {
        if(o.getAttribute('data-correct') === 'true') o.classList.add('bb-right');
      });
    }

    feedback.textContent = isCorrect
      ? "Correct! Groceries change amount week to week, which makes it a variable expense."
      : "Not quite — hostel rent and the bus pass usually stay the same each month (fixed). Groceries change based on what you buy, so that's the variable expense.";
    feedback.style.color = isCorrect ? 'var(--teal)' : 'var(--coral)';
    feedback.style.fontWeight = '600';
  });
});

document.getElementById('ruleCalcBtn').addEventListener('click', function(){
  const input = document.getElementById('ruleIncome');
  const errorEl = document.getElementById('ruleError');
  const resultsEl = document.getElementById('ruleResults');
  const rawValue = input.value.trim();
  const income = parseFloat(rawValue);

  errorEl.textContent = '';
  resultsEl.style.display = 'none';

  if(rawValue === ''){
    errorEl.textContent = 'Please enter a monthly income to calculate your split.';
    return;
  }
  if(isNaN(income) || income <= 0){
    errorEl.textContent = 'Please enter a valid positive number for income.';
    return;
  }

  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;

  document.getElementById('ruleAmtNeed').textContent = 'Rs. ' + needs.toLocaleString('en-PK', {maximumFractionDigits:0});
  document.getElementById('ruleAmtWant').textContent = 'Rs. ' + wants.toLocaleString('en-PK', {maximumFractionDigits:0});
  document.getElementById('ruleAmtSave').textContent = 'Rs. ' + savings.toLocaleString('en-PK', {maximumFractionDigits:0});

  resultsEl.style.display = 'flex';

  requestAnimationFrame(() => {
    document.getElementById('ruleBarNeed').style.width = '50%';
    document.getElementById('ruleBarWant').style.width = '30%';
    document.getElementById('ruleBarSave').style.width = '20%';
  });
});

document.getElementById('ruleIncome').addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    document.getElementById('ruleCalcBtn').click();
  }
});


  const expenseForm =
        document.getElementById("expenseForm");

    const expenseDate =
        document.getElementById("expenseDate");

    const expenseCategory =
        document.getElementById("expenseCategory");

    const expenseDescription =
        document.getElementById("expenseDescription");

    const expenseAmount =
        document.getElementById("expenseAmount");

    const startingBalance =
        document.getElementById("startingBalance");

    const expenseTableBody =
        document.getElementById("expenseTableBody");

    const emptyTable =
        document.getElementById("emptyTable");

    const tableWrapper =
        document.getElementById("tableWrapper");

    const expenseCount =
        document.getElementById("expenseCount");

    const totalExpenses =
        document.getElementById("totalExpenses");

    const remainingBalance =
        document.getElementById("remainingBalance");

    const balanceMessage =
        document.getElementById("balanceMessage");

    const submitBtn =
        document.getElementById("submitBtn");


    /* ---------- DATA ---------- */

    let expenses = [];

    let editingId = null;


    /* ---------- FORMAT MONEY ---------- */

    function formatMoney(amount) {

        return "Rs. " + amount.toLocaleString("en-PK", {
            maximumFractionDigits: 2
        });

    }


    /* ---------- CLEAR ERRORS ---------- */

    function clearErrors() {

        document
            .querySelectorAll(".error-message")
            .forEach(function(error) {

                error.textContent = "";

            });

        document
            .querySelectorAll(".input-error")
            .forEach(function(input) {

                input.classList.remove("input-error");

            });

    }


    /* ---------- SHOW ERROR ---------- */

    function showError(input, errorId, message) {

        input.classList.add("input-error");

        document.getElementById(errorId).textContent =
            message;

    }


    /* ---------- RENDER TABLE ---------- */

    function renderExpenses() {

        expenseTableBody.innerHTML = "";


        /* Empty State */

        if (expenses.length === 0) {

            emptyTable.style.display = "flex";

            tableWrapper.style.display = "none";

        }

        else {

            emptyTable.style.display = "none";

            tableWrapper.style.display = "block";


            expenses.forEach(function(expense) {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${formatDate(expense.date)}
                    </td>

                    <td>
                        <span class="category-badge">
                            ${expense.category}
                        </span>
                    </td>

                    <td>
                        ${escapeHTML(expense.description)}
                    </td>

                    <td class="amount-cell">
                        ${formatMoney(expense.amount)}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editExpense(${expense.id})"
                                aria-label="Edit expense"
                            >
                                <i class="fa-solid fa-pen"></i>
                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteExpense(${expense.id})"
                                aria-label="Delete expense"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </td>

                `;


                expenseTableBody.appendChild(row);

            });

        }


        updateSummary();

    }


    /* ---------- FORMAT DATE ---------- */

    function formatDate(dateString) {

        const date =
            new Date(dateString + "T00:00:00");

        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* ---------- ESCAPE HTML ---------- */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    /* ---------- UPDATE SUMMARY ---------- */

    function updateSummary() {

        const total =
            expenses.reduce(
                function(sum, expense) {

                    return sum + expense.amount;

                },
                0
            );


        const balance =
            Number(startingBalance.value) || 0;


        const remaining =
            balance - total;


        expenseCount.textContent =
            expenses.length;


        totalExpenses.textContent =
            formatMoney(total);


        remainingBalance.textContent =
            formatMoney(remaining);


        /* ---------- BALANCE MESSAGE ---------- */

        if (remaining < 0) {

            balanceMessage.className =
                "balance-message warning";

            balanceMessage.innerHTML = `

                <i class="fa-solid fa-triangle-exclamation"></i>

                <span>
                    Planned expenses exceed your sample balance by
                    ${formatMoney(Math.abs(remaining))}.
                </span>

            `;

        }

        else if (remaining === 0 && expenses.length > 0) {

            balanceMessage.className =
                "balance-message complete";

            balanceMessage.innerHTML = `

                <i class="fa-solid fa-check"></i>

                <span>
                    Your planned expenses use the full sample balance.
                </span>

            `;

        }

        else if (expenses.length > 0) {

            balanceMessage.className =
                "balance-message";

            balanceMessage.innerHTML = `

                <i class="fa-solid fa-lightbulb"></i>

                <span>
                    You still have ${formatMoney(remaining)}
                    available in your sample balance.
                </span>

            `;

        }

        else {

            balanceMessage.className =
                "balance-message";

            balanceMessage.innerHTML = `

                <i class="fa-solid fa-lightbulb"></i>

                <span>
                    Your planned expenses will appear here.
                </span>

            `;

        }

    }


    /* ---------- ADD / UPDATE EXPENSE ---------- */

    expenseForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            clearErrors();


            const date =
                expenseDate.value;

            const category =
                expenseCategory.value;

            const description =
                expenseDescription.value.trim();

            const amount =
                Number(expenseAmount.value);


            let valid = true;


            /* ---------- VALIDATION ---------- */


            if (date === "") {

                showError(
                    expenseDate,
                    "dateError",
                    "Please select a date."
                );

                valid = false;

            }


            if (category === "") {

                showError(
                    expenseCategory,
                    "categoryError",
                    "Please select a category."
                );

                valid = false;

            }


            if (description === "") {

                showError(
                    expenseDescription,
                    "descriptionError",
                    "Please enter a description."
                );

                valid = false;

            }


            if (
                expenseAmount.value.trim() === "" ||
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                showError(
                    expenseAmount,
                    "amountError",
                    "Enter a valid amount."
                );

                valid = false;

            }


            if (!valid) {

                return;

            }


            /* ---------- EDIT ---------- */

            if (editingId !== null) {

                const expense =
                    expenses.find(function(item) {

                        return item.id === editingId;

                    });


                if (expense) {

                    expense.date =
                        date;

                    expense.category =
                        category;

                    expense.description =
                        description;

                    expense.amount =
                        amount;

                }


                editingId = null;


                submitBtn.innerHTML = `
                    <i class="fa-solid fa-plus"></i>
                    Add Expense
                `;

            }


            /* ---------- ADD ---------- */

            else {

                expenses.push({

                    id: Date.now(),

                    date: date,

                    category: category,

                    description: description,

                    amount: amount

                });

            }


            /* ---------- RESET ---------- */

            expenseForm.reset();

            clearErrors();

            renderExpenses();

        }

    );


    /* ---------- EDIT EXPENSE ---------- */

    function editExpense(id) {

        const expense =
            expenses.find(function(item) {

                return item.id === id;

            });


        if (!expense) {
            return;
        }


        expenseDate.value =
            expense.date;

        expenseCategory.value =
            expense.category;

        expenseDescription.value =
            expense.description;

        expenseAmount.value =
            expense.amount;


        editingId =
            id;


        submitBtn.innerHTML = `
            <i class="fa-solid fa-pen"></i>
            Update Expense
        `;


        expenseDate.focus();

    }


    /* ---------- DELETE EXPENSE ---------- */

    function deleteExpense(id) {

        expenses =
            expenses.filter(function(expense) {

                return expense.id !== id;

            });


        if (editingId === id) {

            editingId = null;

            expenseForm.reset();

            submitBtn.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                Add Expense
            `;

        }


        renderExpenses();

    }


    /* ---------- BALANCE CHANGE ---------- */

    startingBalance.addEventListener(
        "input",
        function() {

            if (Number(startingBalance.value) < 0) {

                startingBalance.value = 0;

            }

            updateSummary();

        }
    );


    /* ---------- INITIAL DISPLAY ---------- */

    renderExpenses();


     const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");


    filterButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const selectedFilter = button.getAttribute("data-filter");


            filterButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            galleryCards.forEach(function(card) {

                const cardCategory = card.getAttribute("data-category");


                if (
                    selectedFilter === "all" ||
                    selectedFilter === cardCategory
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });

     const mistakeCards = document.querySelectorAll(".mistake-card");


    mistakeCards.forEach(function(card) {

        const header = card.querySelector(".mistake-header");

        header.addEventListener("click", function() {

            const isOpen = card.classList.contains("active");


            // Close all cards

            mistakeCards.forEach(function(otherCard) {

                otherCard.classList.remove("active");

                otherCard
                    .querySelector(".mistake-header")
                    .setAttribute("aria-expanded", "false");

            });


            // Open clicked card if it was closed

            if (!isOpen) {

                card.classList.add("active");

                header.setAttribute("aria-expanded", "true");

            }

        });

    });


     const savingsForm =
        document.getElementById("savingsForm");

    const goalName =
        document.getElementById("goalName");

    const targetAmount =
        document.getElementById("targetAmount");

    const currentSavings =
        document.getElementById("currentSavings");

    const monthlyContribution =
        document.getElementById("monthlyContribution");


    const results =
        document.getElementById("results");

    const emptyState =
        document.getElementById("emptyState");


    const displayGoalName =
        document.getElementById("displayGoalName");

    const displayCurrent =
        document.getElementById("displayCurrent");

    const displayTarget =
        document.getElementById("displayTarget");

    const displayRemaining =
        document.getElementById("displayRemaining");

    const displayMonths =
        document.getElementById("displayMonths");

    const progressPercentage =
        document.getElementById("progressPercentage");

    const progressFill =
        document.getElementById("progressFill");

    const savingsTip =
        document.getElementById("savingsTip");


    /* ---------- SET ERROR ---------- */

    function setError(input, errorId, message) {

        input.classList.add("input-error");

        document.getElementById(errorId).textContent =
            message;

    }


    /* ---------- CLEAR ERRORS ---------- */

    function clearErrors() {

        const inputs =
            document.querySelectorAll("input");

        const errors =
            document.querySelectorAll(".error-message");


        inputs.forEach(function(input) {

            input.classList.remove("input-error");

        });


        errors.forEach(function(error) {

            error.textContent = "";

        });

    }


    /* ---------- FORMAT AMOUNT ---------- */

    function formatAmount(amount) {

        return "Rs. " + amount.toLocaleString("en-PK", {
            maximumFractionDigits: 2
        });

    }


    /* ---------- FORM SUBMIT ---------- */

    savingsForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            clearErrors();


            /* ---------- GET VALUES ---------- */

            const name =
                goalName.value.trim();

            const target =
                Number(targetAmount.value);

            const current =
                Number(currentSavings.value);

            const monthly =
                Number(monthlyContribution.value);


            let isValid = true;


            /* =========================================
               VALIDATION
            ========================================= */


            /* Goal Name */

            if (name === "") {

                setError(
                    goalName,
                    "goalNameError",
                    "Please enter a goal name."
                );

                isValid = false;

            }


            /* Target Amount */

            if (
                targetAmount.value.trim() === "" ||
                !Number.isFinite(target) ||
                target <= 0
            ) {

                setError(
                    targetAmount,
                    "targetAmountError",
                    "Enter a valid target amount."
                );

                isValid = false;

            }


            /* Current Savings */

            if (
                currentSavings.value.trim() === "" ||
                !Number.isFinite(current) ||
                current < 0
            ) {

                setError(
                    currentSavings,
                    "currentSavingsError",
                    "Enter a valid savings amount."
                );

                isValid = false;

            }


            /* Monthly Contribution */

            if (
                monthlyContribution.value.trim() === "" ||
                !Number.isFinite(monthly) ||
                monthly <= 0
            ) {

                setError(
                    monthlyContribution,
                    "monthlyContributionError",
                    "Enter a valid monthly contribution."
                );

                isValid = false;

            }


            /* Current savings cannot exceed target */

            if (
                current > target &&
                target > 0
            ) {

                setError(
                    currentSavings,
                    "currentSavingsError",
                    "Current savings cannot exceed the target amount."
                );

                isValid = false;

            }


            /* Stop if invalid */

            if (!isValid) {

                return;

            }


            /* =========================================
               CALCULATIONS
            ========================================= */


            const remaining =
                Math.max(target - current, 0);


            let progress =
                (current / target) * 100;


            progress =
                Math.min(progress, 100);


            let months = 0;


            if (remaining > 0) {

                months =
                    Math.ceil(
                        remaining / monthly
                    );

            }


            /* =========================================
               DISPLAY RESULTS
            ========================================= */


            displayGoalName.textContent =
                name;


            displayCurrent.textContent =
                formatAmount(current);


            displayTarget.textContent =
                formatAmount(target);


            displayRemaining.textContent =
                formatAmount(remaining);


            progressPercentage.textContent =
                Math.round(progress) + "%";


            progressFill.style.width =
                progress + "%";


            /* =========================================
               TIME + SAVINGS TIP
            ========================================= */


            if (remaining === 0) {

                displayMonths.textContent =
                    "Goal reached";


                savingsTip.textContent =
                    "Amazing! You have reached your savings goal. Keep building good money habits.";

            }

            else {

                displayMonths.textContent =
                    months +
                    (months === 1
                        ? " month"
                        : " months");


                if (progress < 25) {

                    savingsTip.textContent =
                        "Start small and stay consistent. Every contribution brings you closer to your goal.";

                }

                else if (progress < 75) {

                    savingsTip.textContent =
                        "You're making progress! Keep your monthly contributions consistent.";

                }

                else {

                    savingsTip.textContent =
                        "You're getting close! Stay consistent and keep your goal in sight.";

                }

            }


            /* ---------- SHOW RESULTS ---------- */

            emptyState.style.display =
                "none";

            results.classList.add("show");

        }

    );




    
document.addEventListener("DOMContentLoaded", function () {

  // Visitor Counter
  let visitors = localStorage.getItem("bbVisitors");

  if (visitors === null) {
    visitors = 1;
  } else {
    visitors = parseInt(visitors) + 1;
  }

  localStorage.setItem("bbVisitors", visitors);

  document.getElementById("visitor-count").textContent =
    Number(visitors).toLocaleString() + " visitors";


  // Real-Time Date and Time
  function updateDateTime() {
    const now = new Date();

    document.getElementById("current-date").textContent =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });

    document.getElementById("current-time").textContent =
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);


  // Smooth Back to Top
  document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});