import React from "react";

function CreateEventForm(props) {
  const {
    title,
    price,
    poster,
    date,
    description,
    setTitle,
    setPrice,
    setPoster,
    setDate,
    setDescription
  } = props;

  return (
    <form>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </div>
      <div className="form-control">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="poster">Poster</label>
        <input
          type="text"
          id="poster"
          value={poster}
          onChange={e => setPoster(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols="25"
          rows="7"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>
    </form>
  );
}

export default CreateEventForm;
