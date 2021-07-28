import axios from 'axios';
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { AiOutlineSearch } from 'react-icons/ai';

const MainSearchBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  console.log(selectedOption);
  const handleSearch = (queryName) => {
    setIsLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}search/software?name=${queryName}`,
      )
      .then((response) => {
        console.log(response.data);
        setOptions(response.data);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <>
      <div className="mb-4">
        <h1>Software Repository</h1>
        <p className="text-muted">Search for your favourite software</p>
      </div>
      <InputGroup>
        <InputGroup.Text>
          <AiOutlineSearch />
        </InputGroup.Text>
        <AsyncTypeahead
          filterBy={filterBy}
          id="main-search-bar"
          isLoading={isLoading}
          labelKey="name"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          placeholder="Search for a software via name..."
          onChange={(selected) => setSelectedOption(selected)}
          renderMenuItemChildren={(option) => (
            <>
              <span>{option.name}</span>
            </>
          )}
        />
      </InputGroup>
    </>
  );
};

export default MainSearchBar;
