$(function () {
    // -------- BUDGET FROM --------

    $('#continueToPartTwo').click(function () {
        container.formController.continueToPartTwo()
    })

    $('#addExpense-btn').click(function () {
        $('#add-known-expense').toggle(200)
    })

    $('#submitExpense-budget').click(function () {
        container.formController.submitExpenseBudget()
    })

    $('#cancelExpenseSubmit-budget').click(function () {
        $('#add-known-expense').hide(600)
    })


    $('#addSavingGoal-btn').click(function () {
        $('#savings-form').toggle(200)
    })

    $('#submit-savings').click(function () {
        container.formController.submitSavings()
    })

    $('#cancelSubmit-savings').click(function () {
        $('#savings-form').hide(600)
    })


    $('#budget-form-submit').click(function () {
        container.formController.submitBudget()
        container.sidepanelController.visualizeCalendar()
        container.currencyHandler.generateCurrencyChangeMenu()
    })


    $('#submitExpense').click(function () {
        container.expensesController.submitExpense()
    })


    $('#submitIncome').click(function () {
        container.incomeController.submitIncome()
    })

    $("#addIncomeBtn").click(function () {
        container.navbarController.showIncomeBar()
    })

    $("#addExpenseBtn").click(function () {
        container.navbarController.showExpensesBar()
    })

    // ------ SidePanel ------
    $("#callendarBtn").click(function () {
        $(".callendar").toggle(200);
    })

    //______Currency Menu__________
    $('.currency-item').click(function () {
        console.log('bravo')

        let currentCurrency = container.currencyHandler.getCurrentCurrency()
        let convertToEUR = container.currencyHandler.convertToBaseEUR

        container.ajaxProvider.changeCurrencry(convertToEUR, currentCurrency)

        let clickedCurrency = $(this).text()
        let updateToDesired = container.currencyHandler.updateCurrency

        container.ajaxProvider.changeCurrencry(updateToDesired, clickedCurrency)
        container.currencyHandler.updateDatabase(clickedCurrency)
    })


})