import './PetalAnimation.css';

const PetalAnimation = () => {
    const petalCount = 30; // Number of petals

    const petals = Array.from({ length: petalCount }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 8}s`, // Slower falling speed: 8s to 13s
            animationDelay: `${Math.random() * 10}s`,
        };
        return <div key={i} className="petal" style={style} />;
    });

    return <div className="petal-container">{petals}</div>;
};

export default PetalAnimation; 