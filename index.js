// Changing title of app depended on The Date
const budgetTitle = document.getElementById('budget-title')
const today = new Date()
const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
const currentMonth = months[today.getMonth()]
const currentYear = today.getFullYear()
budgetTitle.textContent = `Monthly Budget App - ${currentMonth} ${currentYear}`

// handling input data
const budgetTotalIncome = document.getElementById('budget-total-income-number') 
const budgetTotalExpense = document.getElementById('budget-total-expense-number')
const budgetCurrent = document.getElementById('budget-current')
const budgetExpensePercent = document.getElementById('budget-total-expense-percent')
const budgetType = document.getElementById('budget-type')
const budgetName = document.getElementById('budget-name')
const budgetNumber = document.getElementById('budget-number')
const btnInputData = document.getElementById('btn-input-data')
const budgeDetailName = document.getElementById('budge-detail-name')
const budgeDetailNumber = document.getElementById('budge-detail-number')

const incomeDetail = document.getElementById('income-detail')
const expenseDetail = document.getElementById('expense-detail')

let incomeList = new Map()
let expenseList = new Map()


let totalIncome = 0
let totalExpense = 0
let currentBalance = 0
let sign = ''
const currencySign = '&#8364;'

function renderList(a){
    let i = 1
    let lineStyle = ''
    let listItems = ''
    for (let [key, value] of a.entries()) {
        if (i % 2 == 0){
            lineStyle = 'bk-grey'
            i++
        }            
        else{
            lineStyle = ''
            i++
        }
            
        listItems += `
            <div class="budget-detail-list ${lineStyle}">
                <p class="budge-detail-name">${key}</p>
                <p class="budge-detail-number">${value}</p>
                <p class="icon-type"> <i class="far fa-trash-alt" id='${key}'></i></p>  
            </div> 
        `
      }
    return listItems
}

btnInputData.addEventListener('click', function(){
    if (budgetType.value === 'income'){
        incomeList.set(budgetName.value, Number(budgetNumber.value))
        totalIncome += Number(budgetNumber.value)
        budgetTotalIncome.innerHTML = ` + ${totalIncome} ${currencySign} `
        incomeDetail.innerHTML = renderList(incomeList)
    } 
    else if(budgetType.value === 'expense'){
        expenseList.set(budgetName.value, Number(budgetNumber.value))
        totalExpense += Number(budgetNumber.value)
        budgetTotalExpense.innerHTML = `- ${totalExpense} ${currencySign} `
        expenseDetail.innerHTML = renderList(expenseList)
    }
    currentBalance = totalIncome - totalExpense
    if (currentBalance >= 0)
        sign = ' + '
    else
        sign = ' '
    budgetCurrent.innerHTML = sign + currentBalance + currencySign
    budgetExpensePercent.textContent = Math.floor((totalExpense/totalIncome)*100) + '%'
    budgetName.value = ''
    budgetNumber.value = 0
    // console.log(incomeList)
    // console.log(expenseList)
})



