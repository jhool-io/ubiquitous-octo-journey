/**
 * Weather Search App - React Frontend
 *
 * This file contains the React components for the weather search application.
 * Candidates need to implement the API integration and component logic.
 */

const { useState, useEffect } = React;

/**
 * Main Weather App Component
 */
function WeatherApp() {
    // TODO: Set up state variables for the application
    const [city, setCity] = useState(''); // TODO: State for city input
    const [weatherData, setWeatherData] = useState(null); // TODO: State for weather data
    const [loading, setLoading] = useState(false); // TODO: Loading state
    const [error, setError] = useState(''); // TODO: Error state

    /**
     * Handle form submission
     */
    const handleSearch = async (e) => {
        // TODO: Prevent default form submission
        // e.preventDefault();

        // TODO: Validate city input
        if (false /* TODO: Add validation condition */) {
            setError('Please enter a city name');
            return;
        }

        // TODO: Clear previous error and set loading state
        setError('');
        setLoading(true);

        try {
            // TODO: Make API call to your PHP backend
            const response = await fetch(/* TODO: Add API endpoint URL with city parameter */);

            // TODO: Check if response is successful
            if (false /* TODO: Check response.ok */) {
                // TODO: Parse JSON response
                const data = await response.json();

                // TODO: Update weather data state
                setWeatherData(data);
            } else {
                // TODO: Handle API error response
                const errorData = await response.json();
                setError(errorData.error || 'Failed to fetch weather data');
            }

        } catch (error) {
            // TODO: Handle network errors
            console.error('Weather API Error:', error);
            setError('Unable to connect to weather service. Please try again.');
        } finally {
            // TODO: Set loading to false
            setLoading(false);
        }
    };

    /**
     * Clear search results
     */
    const clearResults = () => {
        // TODO: Reset all state variables
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
                        // TODO: Add proper input validation attributes
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
    // TODO: Extract data from the weather response
    const {
        city,
        country,
        temperature,
        description,
        humidity,
        windSpeed,
        icon
    } = data;

    // TODO: Create weather icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <div className="weather-card">
            <div className="weather-header">
                <div className="location">
                    <h2>
                        <i className="fas fa-map-marker-alt"></i>
                        {/* TODO: Display city and country */}
                        {city}, {country}
                    </h2>
                </div>
                <div className="weather-icon">
                    {/* TODO: Display weather icon */}
                    <img src={iconUrl} alt={description} />
                </div>
            </div>

            <div className="weather-main">
                <div className="temperature">
                    {/* TODO: Display temperature with proper formatting */}
                    <span className="temp-value">{Math.round(temperature)}</span>
                    <span className="temp-unit">°C</span>
                </div>
                <div className="description">
                    {/* TODO: Display weather description with proper capitalization */}
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
                        {/* TODO: Display humidity percentage */}
                        <span className="detail-value">{humidity}%</span>
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-icon">
                        <i className="fas fa-wind"></i>
                    </div>
                    <div className="detail-content">
                        <span className="detail-label">Wind Speed</span>
                        {/* TODO: Display wind speed */}
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