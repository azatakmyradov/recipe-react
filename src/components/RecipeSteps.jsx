import PropTypes from 'prop-types';

RecipeSteps.propTypes = {
    steps: PropTypes.array.isRequired,
};

export default function RecipeSteps(props) {
    return (
        <div className="mb-10">
            {props.steps.map((step, key) => (
                <>
                    <section className="divide-y divide-secondary-light">
                        <h1
                            className="text-red-300 text-lg font-bold"
                            key={key}
                        >
                            Step {key + 1}
                        </h1>
                        <p className="my-2 pt-2 text-red-100">{step}</p>
                    </section>
                </>
            ))}
        </div>
    );
}
