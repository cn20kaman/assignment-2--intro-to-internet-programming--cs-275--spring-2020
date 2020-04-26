window.onload = () => {
    let recipe = document.getElementById(`recipe`);
    let ounces = document.getElementById(`ounces`);
    let title = document.getElementById(`title`);
    let riceSelector = document.getElementById(`type-select`);
    let riceType = riceSelector.value;

    const ounceInput = function(e){
        updateRecipe(riceType, e.target.value);
    };

    const typeInput = function(e){
        title.innerHTML = e.target.value;
        riceType=e.target.value;
        updateRecipe(e.target.value);
        ounces.value = 1;
    };

    let updateRecipe = function(riceType, numOfOunces = 1) {
        if(numOfOunces===``){numOfOunces=1;}
        let whiteRice = `For slightly al dente: </br> Combine ` + numOfOunces +
        ` ounces of rice with ` + numOfOunces * 1.6 +
        ` ounces of water or broth and 1 Tbsp olive oil. Bring to a boil and stir `+
        ` once to mix. Reduce heat to low, cover with a tight-fitting lid and `+
        ` cook for 25 minutes. Remove from heat and let stand for 5 minutes. ` +
        `Fluff with a fork and serve. </br> </br> For softer rice: </br> Increase `+
        `liquid by ` + numOfOunces * 0.4 + ` and cook time by 5 minutes.`;
        let caliRice = `Combine ` + numOfOunces + ` ounces of rice with ` +
        numOfOunces * 2 + ` ounces of water and 1 Tbsp olive oil. Bring to a boil, `
        + `then reduce heat to the lowest setting. Cook for about 18 minutes.`;
        if(riceType===`White Rice`){recipe.innerHTML=whiteRice;}
        else{recipe.innerHTML=caliRice;}
        title.innerHTML=riceType;
    };

    ounces.addEventListener(`input`,ounceInput);
    riceSelector.addEventListener(`input`,typeInput);

    updateRecipe(riceType, ounces.value);
};
