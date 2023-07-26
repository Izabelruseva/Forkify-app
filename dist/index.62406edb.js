// import icons from 'url:../img/icons.svg';
// console.log(icons);
const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        recipeView.renderSpinner();
        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());
        // 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks);
        // 2) Loading recipe
        await model.loadRecipe(id);
        // 3) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
        console.error(err);
    }
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showRecipe = async function() {
    try {
        const res = await fetch(// 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca3b'
        "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        console.log(res, data);
        let recipe = data.data.recipe;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            servings: recipe.servings,
            publisher: recipe.publisher,
            sourceurl: recipe.source_url,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
        const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">4</span>
            <span class="recipe__info-text">${recipe.servings}</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map((ing)=>{
            return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
            `;
        }).join("")}
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">1000</div>
              <div class="recipe__description">
                <span class="recipe__unit">g</span>
                pasta
              </div>
            </li>

           
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceurl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        
        `;
        recipeContainer.innerHTML = " ";
        recipeContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (err) {
        alert(err);
    }
};
showRecipe();
console.log(`hello`);

//# sourceMappingURL=index.62406edb.js.map
