import React, { useState } from "react";

interface CreateProgrammeProps {
  onProgrammeCreated?: () => void;
}

const CreateProgramme: React.FC<CreateProgrammeProps> = ({ onProgrammeCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [error] = useState<string | null>(null);
  const [success] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    window.alert("🚫 Programme creation is disabled in demo mode."); 
  };

  return (
    <div className="mt-10 bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Programme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Programme Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Create Programme
          </button>
        </div>
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
      {success && <div className="mt-4 text-green-600 font-medium">{success}</div>}
    </div>
  );
};

export default CreateProgramme;
