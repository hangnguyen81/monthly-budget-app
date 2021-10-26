// Changing title of app depended on The Date
const budgetTitle = document.getElementById('budget-title');
const today = new Date();
const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
const currentMonth = months[today.getMonth()];
const currentYear = today.getFullYear();
budgetTitle.textContent = `Monthly Budget App - ${currentMonth} ${currentYear}`;

// handling input data
const budgetTotalIncome = document.getElementById('budget-total-income-number') ;
const budgetTotalExpense = document.getElementById('budget-total-expense-number');
const budgetCurrent = document.getElementById('budget-current');
const budgetExpensePercent = document.getElementById('budget-total-expense-percent');
const budgetType = document.getElementById('budget-type');
const budgetName = document.getElementById('budget-name');
const budgetNumber = document.getElementById('budget-number');
const btnInputData = document.getElementById('btn-input-data');
const budgeDetailName = document.getElementById('budge-detail-name');
const budgeDetailNumber = document.getElementById('budge-detail-number');
const iconType = document.querySelector('.icon-type');

const incomeDetail = document.getElementById('income-detail');
const expenseDetail = document.getElementById('expense-detail');

let incomeList = [];
let expenseList = [];


let totalIncome = 0;
let totalExpense = 0;
let currentBalance = 0;
let sign = '';
const currencySign = '&#8364;';

function renderList(arr){
    let i = 1;
    let lineStyle = '';
    let listItems = '';
    for (let item of arr) {
        if (i % 2 == 0){
            lineStyle = 'bk-grey';
            i++;
        }            
        else{
            lineStyle = '';
            i++;
        }
            
        listItems += `
            <div class="budget-detail-list ${lineStyle}">
                <p class="budge-detail-name">${item.key}</p>
                <p class="budge-detail-number">${item.value}</p>
                <img class="delete-button" data-key=${item.key} data-value=${item.value} src='images/delete-icon.png'>   
            </div> 
        `;
      }
    return listItems;
}

function displayStatic(){
    currentBalance = totalIncome - totalExpense;
    if (currentBalance >= 0)
        sign = ' + ';
    else
        sign = ' ';
    budgetCurrent.innerHTML = sign + currentBalance.toLocaleString('de-DE') + currencySign;
    budgetTotalIncome.innerHTML = ` + ${totalIncome.toLocaleString('de-DE')}${currencySign} `;
    budgetTotalExpense.innerHTML = `- ${totalExpense.toLocaleString('de-DE')}${currencySign} `;
    if (totalIncome === 0)
        budgetExpensePercent.textContent = '-';
    else
        budgetExpensePercent.textContent = Math.floor((totalExpense/totalIncome)*100) + '%';
    budgetName.value = '';
    budgetNumber.value = 0;
    incomeDetail.innerHTML = renderList(incomeList);
    expenseDetail.innerHTML = renderList(expenseList);
}

const isEmpty = str => !str.trim().length;

btnInputData.addEventListener('click', function(){
    if(isNaN(budgetNumber.value)){
        window.alert('You must enter the number');
    }
    else if (isEmpty(budgetName.value)){
        window.alert('You must enter the description of income/expense');
    }    
    else{
        const newBudget = {
            key: budgetName.value,
            value: Number(budgetNumber.value)
        }
    
        if (budgetType.value === 'income'){
            incomeList.push(newBudget);
            totalIncome += Number(budgetNumber.value);
        } 
        else if(budgetType.value === 'expense'){
            expenseList.push(newBudget);
            totalExpense += Number(budgetNumber.value);          
        }
        displayStatic();
    }
    

})

document.body.addEventListener('click', event =>{
    if (!event.target.matches('.delete-button')) return
    const key = event.target.dataset.key;
    const value = Number(event.target.dataset.value);
    if (event.target.closest('#income-detail')){
        totalIncome = totalIncome - value;        
        incomeList = incomeList.filter(item => item.key != key);
    }else{
        totalExpense = totalExpense - value; 
        expenseList = expenseList.filter(item => item.key != key);
    }
    displayStatic();
})


