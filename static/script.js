function new_regime(amt){
    let slab = 0;

    function sum_of_fives(n){
        total = (n/2) * (5*n - 5);
        return total;
    }

    var lower_limits = {7:1500000, 6:1250000, 5:1000000, 4:750000, 3:500000, 2:250000, 1:0};

    if (amt > 1500000){
        slab = 7;
    }
    else if (amt > 1250000 && amt <= 1500000){
        slab = 6;
    }
    else if (amt > 1000000 && amt <= 1250000){
        slab = 5;
    }
    else if (amt > 750000 && amt <= 1000000){
        slab = 4;
    }
    else if (amt > 500000 && amt <= 750000){
        slab = 3;
    }
    else if (amt > 250000 && amt <= 500000){
        slab = 2;
    }
    else if (amt>=0 && amt <= 250000){
        slab = 1;
    }

    let new_amt = 0;

    if (slab < 7 && slab > 1){
        const lower = lower_limits[slab];
        const temp_amt = amt - lower;

        new_amt =  (lower/(slab-1)*sum_of_fives(slab-1) + temp_amt*(sum_of_fives(slab)-sum_of_fives(slab-1)))/100;
    }
    else if (slab === 1){
        new_amt = 0;
    }
    else if (slab == 7){
        let temp = amt - 1500000;
        temp = temp*0.3;
        new_amt = (sum_of_fives(slab-1)*250000)/100 + temp;
    }

    return Math.round(new_amt);
}

function old_regime(amt){
    let slab = 0;

    if (amt > 500000){
        if (amt > 1000000){
            slab = 4;
        }
        else if (amt <= 1000000 && amt > 500000){
            slab = 3;
        }
        else if (amt <= 500000 && amt > 250000){
            slab = 2;
        }
        else if (amt <= 250000 && amt >= 0){
            slab = 1;
        }

        const percentage = {1:0, 2:0.05, 3:0.2, 4: 0.3}

        const slab_diffrence = {1:{1:0}, 2:{1:250000}, 3:{1:250000,2:250000}, 4:{1:250000, 2:250000, 3:500000}}
        const slab_lower_limit = {1:0, 2:250000, 3:500000, 4:1000000}
        
        let temp =amt - slab_lower_limit[slab];

        let old = 0;
        
        for (const [key, value] of Object.entries(slab_diffrence[slab])) {
            old = old + percentage[key]*slab_diffrence[slab][key];
        }

        old = old + percentage[slab]*temp;

        return Math.round(old);
    }
    else if (amt <= 500000 && amt > 0){
        return 0;
    }
}

function calculate(regime){

    if (regime == "new"){

        const amt = Number(document.querySelector('.taxable-amount').value);

        if (amt === NaN || amt === 0){
            alert('Please enter a valid amount');
            window.location.reload()
        }

        const tax = new_regime(amt);
        document.querySelector('.new-tax-amount').value = tax;

    }

    else if (regime == "old"){
    
        const amt = Number(document.querySelector('.net-taxable-amount').value);

        if (amt != NaN && amt != 0){
            const old_tax = old_regime(amt);
            document.querySelector('.old-tax-amount').value = old_tax;
        }
        else{
            alert('Please enter a valid amount');
            window.location.reload()
        }
    }

}
