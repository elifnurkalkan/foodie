import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Recipe.css';
import Footer from '../components/Footer';

import React from 'react';

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  let params = useParams();

  const fetchDetails = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`,
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <div>
      <div className="detailWrapper">
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt="" />
        </div>
        <div className="info">
          <button
            onClick={() => setActiveTab('instructions')}
            className={activeTab === 'instructions' ? 'active' : ''}
            type="button"
            id={styles['btnInstruction']}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={activeTab === 'ingredients' ? 'active' : ''}
            type="button"
            id={styles['btnIngredient']}
          >
            Ingredients
          </button>

          {activeTab === 'instructions' && (
            <div className="instructionDetail">
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recipe;
