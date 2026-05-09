// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

import React, { useState } from "react";
import {
  Bike,
  Plus,
  Heart,
  Calendar,
  MapPin,
  Camera,
} from "lucide-react";

export default function BikeMemoriesLandingPage() {
  const [bikes, setBikes] = useState([
    {
      id: 1,
      name: "Royal Enfield Classic 350",
      year: "2023",
      place: "Ladakh Trip",
      memory:
        "One of the best rides through the mountains with unforgettable memories.",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "KTM Duke 390",
      year: "2022",
      place: "Goa Ride",
      memory:
        "Beach roads, sunsets, and late-night rides made this trip special.",
      image:
        "https://images.unsplash.com/photo-1517846693594-1567da72af75?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    place: "",
    memory: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.memory) return;

    const newBike = {
      id: Date.now(),
      ...formData,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    };

    setBikes([newBike, ...bikes]);

    setFormData({
      name: "",
      year: "",
      place: "",
      memory: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Bike size={40} className="text-red-500" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Bike Memories
              </h1>
            </div>

            <p className="text-gray-300 text-lg leading-8 mb-8">
              Store your favorite bikes, unforgettable rides, road trip
              memories, and emotional moments all in one place.
            </p>

            <div className="flex gap-4">
              <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition">
                Explore Collection
              </button>

              <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
                Add Your Bike
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1200&auto=format&fit=crop"
              alt="bike"
              className="rounded-3xl shadow-2xl h-[450px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ADD BIKE FORM */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Plus className="text-red-500" />
            <h2 className="text-3xl font-bold">Add New Bike Memory</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              placeholder="Bike Name"
              className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-400"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Bike Year"
              className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-400"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Ride Location"
              className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-400"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Image URL"
              className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-400"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />

            <textarea
              placeholder="Write your bike memory..."
              rows="5"
              className="md:col-span-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-400"
              value={formData.memory}
              onChange={(e) =>
                setFormData({ ...formData, memory: e.target.value })
              }
            />

            <button
              type="submit"
              className="md:col-span-2 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition font-semibold"
            >
              Save Bike Memory
            </button>
          </form>
        </div>
      </section>

      {/* BIKE COLLECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <Heart className="text-red-500" />
          <h2 className="text-4xl font-bold">My Bike Collection</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{bike.name}</h3>

                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Calendar size={18} />
                  <span>{bike.year}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <MapPin size={18} />
                  <span>{bike.place}</span>
                </div>

                <p className="text-gray-700 leading-7 mb-5">
                  {bike.memory}
                </p>

                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition">
                  <Camera size={18} />
                  View Memories
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Bike Memories</h2>
        <p className="text-gray-400">
          Preserve every ride, every road, and every unforgettable moment.
        </p>
      </footer>
    </div>
  );
}
