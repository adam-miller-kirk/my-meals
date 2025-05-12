export default function RecipeCreatePage() {
  return (
    <form className="flex flex-col gap-2">
      <h3 className="font-bold">Create a recipe</h3>
      <div className="flex gap-4">
        <label className="w-24" htmlFor="name">
          Name
        </label>
        <input id="title" className="border rounded p-2 w-full" name="name" />
      </div>
      <div className="flex gap-4">
        <label className="w-24" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          className="border rounded p-2 w-full"
          name="description"
        />
      </div>
      <div className="flex gap-4">
        <label className="w-24" htmlFor="ingredients">
          Ingredients
        </label>
        <input
          id="ingredients"
          className="border rounded p-2 w-full"
          name="ingredients"
        />
      </div>
      <div className="flex gap-4">
        <label className="w-24" htmlFor="instructions">
          Instructions
        </label>
        <input
          id="instructions"
          className="border rounded p-2 w-full"
          name="instructions"
        />
      </div>

      <button type="submit" className="rounded p-2 bg-blue-200 w-full">
        Create
      </button>
    </form>
  );
}
