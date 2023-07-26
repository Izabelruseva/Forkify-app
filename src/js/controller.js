const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function () {
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
