$(function () {

    let salary
    let expenses = []
    let savingGoals

    let sumOfExpenses = 0

    //for the initial budget form --> expense form

    //koleto
    $('#continueToPartTwo').click(function () {

        salary = $('#salary-budget').val()
        let payday = +$('#payday-budget').val()


        let budget = modelFactory().createBudget(salary, payday, [], {})
        database().budget = budget

        let regex = new RegExp('[0-9]+')

        let salaryTrimed = +function trimStart(character, string) {
            let startIndex = 0;

            while (string[startIndex] === character) {
                startIndex++;
            }

            return string.substr(startIndex);
        }(0, salary)

        if(salaryTrimed > 0 && regex.test(salaryTrimed)){
            let checked = $('#monthEndDateCheckBox').is(':checked')

            if(checked){

            }

            if(typeof payday === "number" && payday > 0 && payday < 31){
                $('#salary-span').text(salaryTrimed)
                $('#expense-progress').attr({
                    'aria-valuemax': salary,
                    'style': 'width:' + getPercentOfProgress() + '%'
                })

                $(".partOne").hide(100);
                $(".partTwo").show()
            }
            else{
                alert('Please enter a valida day of the month')
            }
        }
        else {
            alert('Salary must be a number!')
        }
    })

    function getPercentOfProgress() {
        return ((sumOfExpenses / salary) * 100)
    }

    $('#submitExpense-budget').on('click', function () {
        let expense = getExpenses()

        sumOfExpenses += expense.amount

        expenses.push(expense)

        if(sumOfExpenses > salary){
            alert('You reached the limit of your expenses!')
        }
        else{
            updateForm(sumOfExpenses)

            $('#add-known-expense').hide(300)
        }
    })

    function updateForm(sumOfExpenses) {
        $('#expenses-span').text(sumOfExpenses)
        $('.counter').text(expenses.length)
        $('#expense-progress').attr({
            'style': 'width:' + getPercentOfProgress() + '%'
        })
        $('#subtractMoneyNote-budget').val(0)
        $('#subtractMoney-budget').val(0)

    }

    let getExpenses = function () {
        let type = $("input[name = 'knownExpenseType']:checked").val()
        let category = $("input[name='knownExpenseCategory']:checked").val()
        let amount = +$('#subtractMoney-budget').val()
        let note = $('#subtractMoneyNote-budget').val()

        switch (type){
            case 'Week':
                amount *= 4
                break
            case 'Daily':
                amount *= 30
                break
            case 'Year':
                amount /= 12
                break
        }
        console.log(modelFactory().createKnownExpense(type, category, amount, note))
        return modelFactory().createKnownExpense(type, category, amount, note)
    }



    $('#submit-savings').click(function () {
        savingGoals = getSavings()
        $('#savings-form').hide(300)
    })

    $('#cancelExpenseSubmit-budget').click(function () {
        $('#add-known-expense').hide(600)
    })

    $('#addExpense-btn').click(function () {
        $('#add-known-expense').toggle(200)
    })

    $('#cancelSubmit-savings').click(function () {
        $('#savings-form').hide(600)
    })

    $('#addSavingGoal-btn').click(function () {
        $('#savings-form').toggle(200)
    })

    $('#budget-form-submit').click(function () {

        database().budget.expenses = expenses
        database().budget.savingGoals = savingGoals

        //koleto: some visual functionalities added, when pressing the button
        $(".wrap-budget-form").hide();
        $("#myNavbar").show();
        $("#budget-progressbar").show();
        loadPiechart();
        loadBarchart();
        $("#sidepanel").show(200);
        //koleto end

        console.log(database().budget)
    })

    let getSavings = function () {

        let amount = $('#savings-form-money').val()
        let note = $('#savings-form-note').val()

        return modelFactory().createSavingGoals(amount, note)
    }

    //koleto
    //payday end of the month checkbox
    $("#monthEndDateCheckBox").change(function(){
        let $payDayForm = $("#payday-budget");
        if ($payDayForm.prop("disabled") === true) {
            $payDayForm.prop("disabled", false);
            $payDayForm.attr("placeholder", "Specify date of the month");
        } else {
            $payDayForm.val("");
            $payDayForm.attr("placeholder", "End of the month");
            $payDayForm.prop("disabled", true);
        }
    })

    //add known expense - default radio buttons behaviours sat
    var $setPayType = $('input:radio[name=knownExpenseType]');
    if ($setPayType.is(":checked") === false ) {
        $setPayType.filter("[value=month]").prop("checked", true);
    }

    $setPayType.change(function() {
        let payType = ["Month", "Week", "Daily", "Year"];
        for (let i = 0; i<=payType.length-1; i++) {
            if ($(this).attr("value") === payType[i].toLowerCase()) {
                $("#selectDateExpense-budget-label").text(payType[i]);
                break;
            }
        }
    });

    var $setCategory = $('input:radio[name=knownExpenseCategory]');
    if ($setCategory.is(":checked") === false ) {
        $setCategory.filter("[value=miscellaneous]").prop("checked", true);
        $("#selectIncome-budget-label").text("default: Miscellaneous");
    }

    $setCategory.change(function() {
        let categories = [
            "Taxes", "Housing", "Food", "Automobile",
            "Insurance", "Debt Repayment", "Entertainment", "Clothing",
            "Savings", "Medical/Dental", "Miscellaneous", "School",
            "Investments", "Childcare", "Other"];

        let $btnLabel = $("#selectIncome-budget-label");
        let $noteField = $("#otherExpenseCategory-budget");
        for (let i = 0; i<=categories.length-1; i++) {
            if ($(this).attr("value") === categories[i].toLowerCase()) {
                $btnLabel.text(categories[i]);
                break;
            } else if ($(this).attr("value") === "debt") {
                $btnLabel.text(categories[5]);
                break;
            } else if ($(this).attr("value") === "medical") {
                $btnLabel.text(categories[9]);
                break;
            }
        }

        if ($(this).attr("value") === "other") {
            $noteField.prop("disabled", false);
        } else {
            $noteField.prop("disabled", true);
        }
    });

    //koleto

})