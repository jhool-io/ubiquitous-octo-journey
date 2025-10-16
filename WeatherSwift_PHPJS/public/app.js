/**
 * Weather Search App - React Frontend
 *
 * A React-based frontend application for searching and displaying weather information.
 * This application provides a modern, responsive interface for weather data retrieval.
 *
 * MINIMUM EXPECTATIONS:
 * - Implement API integration with the PHP backend
 * - Handle form submission and input validation
 * - Display weather data in a user-friendly format
 * - Implement proper error handling and loading states
 * - Ensure responsive design and good user experience
 *
 * REQUIRED FUNCTIONALITY:
 * - Search form with city input validation
 * - API calls to /api/weather endpoint
 * - Weather data display with temperature, description, humidity, and wind speed
 * - Error handling for network issues and invalid cities
 * - Loading indicators during API requests
 *
 * COMPONENTS:
 * - WeatherApp: Main application component
 * - SearchForm: City input and search functionality
 * - WeatherDisplay: Weather data presentation
 * - ErrorMessage: Error display component
 * - LoadingSpinner: Loading state indicator
 */

const { useState, useEffect } = React;

/**
 * Main Weather App Component
 */
function WeatherApp() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Handle form submission
     */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (false) {
            setError('Please enter a city name');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch('');

            if (false) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to fetch weather data');
            }

        } catch (error) {
            console.error('Weather API Error:', error);
            setError('Unable to connect to weather service. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Clear search results
     */
    const clearResults = () => {
        setWeatherData(null);
        setCity('');
        setError('');
    };

    return (
        <div className="weather-app">
            {/* Header */}
            <header className="app-header">
                <h1>
                    <i className="fas fa-cloud-sun"></i>
                    Weather Search
                </h1>
                <p>Enter a city name to get current weather information</p>
            </header>

            {/* Search Form */}
            <SearchForm
                city={city}
                setCity={setCity}
                onSearch={handleSearch}
                loading={loading}
                onClear={clearResults}
            />

            {/* Error Display */}
            {error && <ErrorMessage message={error} onClose={() => setError('')} />}

            {/* Weather Results */}
            {weatherData && <WeatherDisplay data={weatherData} />}

            {/* Loading Indicator */}
            {loading && <LoadingSpinner />}
        </div>
    );
}

/**
 * Search Form Component
 */
function SearchForm({ city, setCity, onSearch, loading, onClear }) {
    return (
        <form className="search-form" onSubmit={onSearch}>
            <div className="form-group">
                <div className="input-container">
                    <i className="fas fa-search input-icon"></i>
                    <input
                        type="text"
                        className="city-input"
                        placeholder="Enter city name (e.g., London, New York)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={loading}
                        required
                        minLength="2"
                    />
                    {city && (
                        <button
                            type="button"
                            className="clear-input"
                            onClick={onClear}
                            disabled={loading}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="search-btn"
                    disabled={loading || !city.trim()}
                >
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Searching...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-search"></i>
                            Get Weather
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

/**
 * Weather Display Component
 */
function WeatherDisplay({ data }) {
    const {
        city,
        country,
        temperature,
        description,
        humidity,
        windSpeed,
        icon
    } = data;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <div className="weather-card">
            <div className="weather-header">
                <div className="location">
                    <h2>
                        <i className="fas fa-map-marker-alt"></i>
                        {city}, {country}
                    </h2>
                </div>
                <div className="weather-icon">
                    <img src={iconUrl} alt={description} />
                </div>
            </div>

            <div className="weather-main">
                <div className="temperature">
                    <span className="temp-value">{Math.round(temperature)}</span>
                    <span className="temp-unit">°C</span>
                </div>
                <div className="description">
                    {description.charAt(0).toUpperCase() + description.slice(1)}
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-icon">
                        <i className="fas fa-tint"></i>
                    </div>
                    <div className="detail-content">
                        <span className="detail-label">Humidity</span>
                        <span className="detail-value">{humidity}%</span>
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-icon">
                        <i className="fas fa-wind"></i>
                    </div>
                    <div className="detail-content">
                        <span className="detail-label">Wind Speed</span>
                        <span className="detail-value">{windSpeed} m/s</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Error Message Component
 */
function ErrorMessage({ message, onClose }) {
    return (
        <div className="error-card">
            <div className="error-content">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{message}</span>
            </div>
            <button className="error-close" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
    return (
        <div className="loading-card">
            <div className="spinner">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
            <p>Fetching weather data...</p>
        </div>
    );
}

/**
 * Render the main application
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WeatherApp />);