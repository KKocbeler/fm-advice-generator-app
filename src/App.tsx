import { useEffect, useState } from "react";
import './App.scss';

export default function App() {
  const [advice, setAdvice] = useState<{id: number, advice: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
console.log(advice)
  useEffect(() => {
    const fetchAdvice = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("https://api.adviceslip.com/advice", { cache: 'no-store' });
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            setAdvice(data.slip);
        } catch (err) {
            setError("Try again");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchAdvice();
  }, []);

  const handleNewAdvice = () => {
    (async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("https://api.adviceslip.com/advice", { cache: 'no-store' });
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            setAdvice(data.slip);
        } catch (err) {
            setError("Advice not found");
            console.error(err);
        } finally {
            setLoading(false);
        }
    })();
  };

    return (
    <main className="advice-app">
      <section className="container">
        {error && <p className="error">{error}</p>}

        {!error && (
          <>
            <h1>#Advice {advice ? advice.id : "..."}</h1>
            {loading ? (
              <span className="loader"></span>
            ) : (
              advice && <p className="advice">“{advice.advice}”</p>
            )}
          </>
        )}

        <picture>
          <source media="(min-width: 768px)" srcSet="/images/pattern-divider-desktop.svg" />
          <img src="/images/pattern-divider-mobile.svg" alt="Pattern divider image" loading="lazy" />
        </picture>

        <button type="button" onClick={handleNewAdvice} disabled={loading}>
          <img src="/images/icon-dice.svg" alt="Dice icon" loading="lazy" />
        </button>
      </section>
    </main>
    );
}
