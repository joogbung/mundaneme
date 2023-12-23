
    // Creating constant variables for the hourly rate, income and clear buttons.
const clearBtn = document.getElementById('clearEl');
const hourlyRateBtn = document.getElementById('hourlyRateButtonEl');
const hourlyRateInput = document.getElementById('hourlyRateEl');
const incomeBtn = document.getElementById('incomeButtonEl');
const incomeInput = document.getElementById('incomeEl');

    // Creating variables out of the user's input for the income function.
function calculateIncome() {
    var hourlyRate = parseFloat(document.getElementById("hourlyRateEl").value);
    var hoursPerDay = parseFloat(document.getElementById("hoursPerDayEl").value);
    var daysPerWeek = parseFloat(document.getElementById("daysPerWeekEl").value);
    var incomeFrequency = document.querySelector("input[name='frequency']:checked").value;
    var income = parseFloat(document.getElementById("incomeEl").value);
  
    if (!isNaN(hourlyRate) && !isNaN(hoursPerDay) && !isNaN(daysPerWeek) && incomeFrequency !== "") {
    // Calculate income based on hourly rate, hours per day, days per week, and income frequency.
      var frequencyMultiplier = {"weekly": 1, "fort-nightly": 2, "monthly": 4, "yearly": 52}[incomeFrequency];
      var calculatedIncome = hourlyRate * hoursPerDay * daysPerWeek * frequencyMultiplier;
      document.getElementById("incomeEl").value = calculatedIncome.toFixed(2);
} 
};

    // Creating variables out of the user's input for the hourly rate function.
function calculateHourlyRate() {
    // var hourlyRate = parseFloat(document.getElementById("hourlyRateEl").value);
    var hoursPerDay = parseFloat(document.getElementById("hoursPerDayEl").value);
    var daysPerWeek = parseFloat(document.getElementById("daysPerWeekEl").value);
    var incomeFrequency = document.querySelector("input[name='frequency']:checked").value;
    var income = parseFloat(document.getElementById("incomeEl").value);
  
    if (!isNaN(income) && !isNaN(hoursPerDay) && !isNaN(daysPerWeek) && incomeFrequency !== "") {
    // Calculate hourly rate based on income, hours per day, days per week, and income frequency.
    var frequencyMultiplier = {"weekly": 1, "fort-nightly": 2, "monthly": 4, "yearly": 52}[incomeFrequency];
    var calculatedHourlyRate = income / (hoursPerDay * daysPerWeek * frequencyMultiplier);
    document.getElementById("hourlyRateEl").value = calculatedHourlyRate.toFixed(2);
} else {
    // If not all necessary inputs are present, display an error message.
    alert("Please enter valid values for all fields.");
}
};

    // The buttons to generate income or hourly rate and clear all button
document.getElementById("incomeButtonEl").addEventListener("click", calculateIncome);
document.getElementById("hourlyRateButtonEl").addEventListener("click", calculateHourlyRate);


clearBtn.addEventListener('click', function() {
    document.getElementById('hourlyRateEl').value = '';
    document.getElementById('hoursPerDayEl').value = '';
    document.getElementById('daysPerWeekEl').value = '';
    document.getElementById('incomeEl').value = '';
    document.getElementById('taxableIncomeEl').value = '';
});

hourlyRateInput.addEventListener("input", function() {
    if (hourlyRateInput.value.trim() == ''){
        hourlyRateBtn.hidden = false;
    } else{
        hourlyRateBtn.hidden = true;
    }
});

incomeInput.addEventListener("input", function() {
    if (incomeInput.value.trim() == ''){
        incomeBtn.hidden = false;
    } else{
        incomeBtn.hidden = true;
    }
});

    // Calculate taxable income
    function calculateTaxableIncome() {
        var income = parseFloat(document.getElementById("incomeEl").value);
        var deductions = parseFloat(document.getElementById("deductionsEl").value);
        

        // Validate input
        if (isNaN(income) || isNaN(deductions)) {
        alert("Please enter valid income and deduction amounts.");
        return;
        }

        var taxableInc = income - deductions;
        document.getElementById("taxableIncomeEl").value = taxableInc.toFixed(2);

    }
    document.getElementById("taxableIncomeBtn").addEventListener("click", calculateTaxableIncome);

    
// Tax calculator code
function calculateTax() {
    var taxFrequency = document.querySelector('input[name="frequency"]:checked').value;
    var frequencyMultiplier = {"weekly": 52, "fort-nightly": 26, "monthly": 12, "yearly": 1}[taxFrequency];
    var taxableIncome = parseFloat(document.getElementById("taxableIncomeEl").value);
    var tax = 0;

    if (isNaN(taxableIncome)) {
        alert("Please calculate the Taxable Income first.");
    } else {

    if (taxableIncome * frequencyMultiplier <= 18200) {
        tax = 0;
    } else if (taxableIncome * frequencyMultiplier <= 45000) {
        tax = (taxableIncome * frequencyMultiplier - 18200) * 0.19 / frequencyMultiplier;
    } else if (taxableIncome * frequencyMultiplier <= 120000) {
        tax = (5092 / frequencyMultiplier) + (taxableIncome * frequencyMultiplier - 45000) * 0.325 / frequencyMultiplier;
    } else if (taxableIncome * frequencyMultiplier <= 180000) {
        tax = (29467 / frequencyMultiplier) + (taxableIncome * frequencyMultiplier - 120000) * 0.37 / frequencyMultiplier;
    } else {
        tax = (51667 / frequencyMultiplier) + (taxableIncome * frequencyMultiplier - 180000) * 0.45 / frequencyMultiplier;
    }
    
    document.getElementById("taxAmountEl").innerHTML = "Your tax is $" + tax.toFixed(2) + " on a  " + taxFrequency + " basis ";
    }
}


document.getElementById("calculateTaxBtn").addEventListener('click', calculateTax);

// Needs an alert for the calculate tax button that tells the user, the taxable income field has to be calculated first, if it hasnt been. 
// Or the calculate tax button is unclickable if the taxable income button field has not been calculated yet
// Also needs a button to calculate net income (after tax, income)