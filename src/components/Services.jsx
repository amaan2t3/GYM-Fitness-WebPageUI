export default function Services() {
  return (
    <section className="p-10 bg-black text-white text-center">
      <h2 className="text-3xl mb-6">Our Services</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3>Personal Training</h3>
          <p>Expert trainers for best results</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3>Cardio Training</h3>
          <p>Improve stamina & endurance</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3>Strength Training</h3>
          <p>Build muscle effectively</p>
        </div>
      </div>
    </section>
  );
}