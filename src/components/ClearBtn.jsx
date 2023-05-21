export default function ClearBtn({clearBoard}) {
  return (
    <button
      className="text-white py-2 px-4 rounded mx-4"
      onClick={clearBoard}
    >
      Clear Board
    </button>
  )
}
