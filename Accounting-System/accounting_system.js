$(function () {

    let expenses
    let savingGoals

    //for the initial budget form --> expense form
    $('#submitExpense-budget').on('click', function () {
        expenses = getExpenses()
        $('#add-known-expense').hide(300)
    })

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

        // alert("Handler for .submit() is called.");

        let salary = $('#salary-buudget').val()
        let payday = $('#payday-budget').val()


        let budget = modelFactory().createBudget(salary, payday, expenses, savingGoals)
        database().budget = budget


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

    let getExpenses = function () {
        let type = $("input[name = 'knownExpenseType']:checked").val()
        let category = $("input[name='knownExpenseCategory']:checked").val()
        let amount = $('#subtractMoney-budget').val()
        let note = $('#subtractMoneyNote-budget').val()

        console.log(modelFactory().createKnownExpense(type, category, amount, note))
        return modelFactory().createKnownExpense(type, category, amount, note)
    }

    let getSavings = function () {

        let amount = $('#savings-form-money').val()
        let note = $('#savings-form-note').val()

        return modelFactory().createSavingGoals(amount, note)
    }

    //koleto
    //payday end of the month checkbox
    $("#monthEndDateCheckBox").change(function(){
        if ($("#payday-budget").prop("disabled") === true) {
            $("#payday-budget").prop("disabled", false);
        } else {
            $("#payday-budget").val("");
            $("#payday-budget").prop("disabled", true);
        }
    }) 

    //add known expense - select pay type button text
    //<input type="radio" name="knownExpenseType" value="month">
    var $setMonths = $('input:radio[name=knownExpenseType]');
    if ($setMonths.is(":checked") === false ) {
        $setMonths.filter("[value=month]").prop("checked", true);
        // $("#selectDateExpense-budget-label").text($setMonths.filter("[value=month]").prev().text());
        // console.log($setMonths.prev())
    }
    
    //$("#selectDateExpense-budget-label").text
    $('input:radio[name=knownExpenseType]').change(function() {
        // let i = 0;
        // let variable = 0;
        // while (variable !== undefined) {
        //     variable = $('input:radio[name=knownExpenseType]')[i]; 
        //     console.log(variable)
        //     i++
        // }

        
        console.log($("label").filter(  ) )
        
    });
    //setter na gornoto
    

    //koleto

})
