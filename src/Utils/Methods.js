export const Capitalize = (string) => {
    string = string.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1?.toUpperCase() + m2?.toLowerCase(),
    );
    return string;
};





export const AppColors = {
    grayBorder: '#E1E1E1',
    biroBlue: '#4069D0',
    white: '#ffffff',
    lightgrey: '#F2F2F2',
    black1: '#545454',
}


export const describeHumidity = (humidity) => {
    if (humidity >= 60 && humidity <= 40) {
        return "Normal";
    } else if (humidity > 60) {
        return "High";
    } else {
        return "Low";
    }
}

export const getWindDirectionAngle = (angle) => {
    const directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW", "N"
    ];

    const index = Math.round(angle / 22.5);
    return directions[index];
}


export const getVisibilityDescription = (visibilityMeters) => {
    const visibilityKm = visibilityMeters / 1000;

    if (visibilityKm > 10) {
        return "Excellent";
    } else if (visibilityKm > 5) {
        return "Good";
    } else if (visibilityKm > 1) {
        return "Moderate";
    } else {
        return "Poor";
    }
}


