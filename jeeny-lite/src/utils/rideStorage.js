// utils/rideStorage.js
export const getRides = () => JSON.parse(localStorage.getItem("rides")) || [];

export const saveRide = (ride) => {
  const rides = getRides();
  rides.push(ride);
  localStorage.setItem("rides", JSON.stringify(rides));
};

export const updateRideStatus = (rideId, newStatus) => {
  const rides = getRides().map((ride) =>
    ride.id === rideId ? { ...ride, status: newStatus } : ride
  );
  localStorage.setItem("rides", JSON.stringify(rides));
};

export const getUserRides = (userId) => {
  return getRides().filter((ride) => ride.passengerId === userId);
};

export const getAvailableRides = () =>
  getRides().filter((ride) => ride.status === "Requested");

export const assignRideToDriver = (rideId, driverId) => {
  const rides = getRides().map((ride) =>
    ride.id === rideId
      ? { ...ride, driverId, status: "Accepted" }
      : ride
  );
  localStorage.setItem("rides", JSON.stringify(rides));
};

export const updateDriverRideStatus = (rideId, newStatus) => {
  updateRideStatus(rideId, newStatus);
};
