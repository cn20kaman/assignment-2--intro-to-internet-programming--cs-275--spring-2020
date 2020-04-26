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
};
