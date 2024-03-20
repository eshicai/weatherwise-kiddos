import './Recommendations.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Recommendations = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const endpoint = 'recommendations';
  const recommendationsUrl = `${baseUrl}/${endpoint}/?api_key=${apiKey}`;

  const { id } = useParams();

  useEffect(() => {
    document.title = 'WeatherWiseCentral';
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(recommendationsUrl);
        setRecommendations(response.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
      }
    }

    fetchRecommendations();
  }, [recommendationsUrl])

  if (hasError) {
    return <p>Unable to access recommendations right now. Please try again later.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (recommendations.length === 0) {
    return <p>No recommendations available</p>
  }

  return (
    <div className='recommendations'>
      <p>{recommendations.weather.cloudy.recommendation}</p>
    </div>
  )
}
