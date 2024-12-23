import React, { useState } from "react";

const RenamePlaylist = ({ isOpen, playlist, onClose, onRename }) => {
  const [newName, setNewName] = useState(playlist?.name || "");

  const handleSubmit = () => {
    if (newName.trim()) {
      onRename(playlist.id, newName);
      onClose();
    }
  };

  if (!playlist) return null; // Return null if no playlist is passed

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="text-black">
        <h2 className="my-4 text-white">Rename Playlist</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full rounded-md p-2"
        />
        <div className="flex justify-end gap-4 mt-2">
          <button className="text-neutral-400" onClick={onClose}>
            Cancel
          </button>
          <button className="text-green-500" onClick={handleSubmit}>
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenamePlaylist;
