import CloseIcon from '../components/icons/Close';
import useLocalStorage from '../hooks/useLocalStorage';
import IngredientsIcon from '../components/icons/Ingredients';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useLocalStorage('ingredients', []);

    const handleSubmit = event => {
        event.preventDefault();

        if (ingredientInput.trim() === '') return;

        let found = false;

        ingredients.forEach(ingredient => {
            if (ingredient.name === ingredientInput) found = true;
        });

        if (!found) {
            const id =
                ingredients.length !== 0
                    ? ingredients[ingredients.length - 1].id + 1
                    : 1;
            setIngredients([
                ...ingredients,
                {
                    id: id,
                    name: ingredientInput.trim(),
                },
            ]);
        }

        setIngredientInput('');
    };

    const removeIngredient = id => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    };

    return (
        <>
            <form action="#" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="ingredient"
                    className="ingredient-input"
                    value={ingredientInput}
                    onChange={event => setIngredientInput(event.target.value)}
                    placeholder="Enter name of the ingredient..."
                />
            </form>

            {ingredients.length > 0 ? (
                <ul className="mt-6">
                    {ingredients.map(ingredient => (
                        <li className="ingredient-item" key={ingredient.id}>
                            {ingredient.name}
                            <button
                                className="w-6"
                                onClick={() => removeIngredient(ingredient.id)}
                            >
                                <CloseIcon />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center my-10">
                    <div className="mx-auto w-40">
                        <IngredientsIcon />
                    </div>
                    <p className="text-lg mt-10">There&apos;s no ingredients</p>
                </div>
            )}

            {ingredients.length < 5 ? (
                <div className="mt-6 text-center font-bold">
                    <p>Add {5 - ingredients.length} more items</p>
                </div>
            ) : (
                <Link to="/create" className="nav-link">
                    Find me a recipe
                </Link>
            )}
        </>
    );
}

export default App;
