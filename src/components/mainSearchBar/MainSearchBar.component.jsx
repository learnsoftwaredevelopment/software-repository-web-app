import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { AiOutlineSearch } from 'react-icons/ai';

const MainSearchBar = () => {
  const cacheRef = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  console.log(selectedOption);

  const PER_PAGE = 50;

  const searchSoftware = (inputQuery, page = 0) => axios
    .get(
      `${process.env.REACT_APP_BACKEND_API}search/software?q=${inputQuery}&page=${page}&per_page=${PER_PAGE}`,
    )
    .then((response) => response.data)
    .then(({ totalQueryResultCount, queryResponse }) => ({
      options: queryResponse,
      total_count: totalQueryResultCount,
    }));

  const handleInputChange = (inputQuery) => {
    setQuery(inputQuery);
  };

  const handlePagination = (event, shownResults) => {
    const cachedQuery = cacheRef.current[query];

    if (
      cachedQuery.options.length > shownResults
      || cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    setIsLoading(true);

    const page = cachedQuery.page + 1;

    searchSoftware(query, page).then((response) => {
      const newOptions = cachedQuery.options.concat(response.options);
      cacheRef.current[query] = { ...cachedQuery, options: newOptions, page };
      setIsLoading(false);
      setOptions(newOptions);
    });
  };

  /**
   * As part of breaking changes in v5 onwards of react-bootstrap-typeahead,
   * if using functional component instead of class component to use useCallBack
   * Resource:
   * https://github.com/ericgio/react-bootstrap-typeahead/blob/master/docs/Upgrading.md#v50-breaking-changes
   * https://github.com/ericgio/react-bootstrap-typeahead/issues/561#issuecomment-650454677
   */
  const handleSearch = useCallback((inputQuery) => {
    if (cacheRef.current[inputQuery]) {
      setOptions(cacheRef.current[inputQuery].options);
      return;
    }

    setIsLoading(true);
    searchSoftware(inputQuery).then((response) => {
      cacheRef.current[inputQuery] = { ...response, page: 0 };
      setIsLoading(false);
      setOptions(response.options);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          id="main-search-bar"
          labelKey="name"
          maxResults={PER_PAGE - 1}
          // eslint-disable-next-line react/destructuring-assignment
          isLoading={isLoading}
          // eslint-disable-next-line react/destructuring-assignment
          options={options}
          minLength={2}
          onInputChange={handleInputChange}
          onPaginate={handlePagination}
          onSearch={handleSearch}
          onChange={(selected) => {
            setSelectedOption(selected);
          }}
          paginate
          placeholder="Search for a software via name..."
          renderMenuItemChildren={(option) => (
            <div key={option.id}>
              <span>{option.name}</span>
            </div>
          )}
          useCache={false}
        />
      </InputGroup>
    </>
  );
};

export default MainSearchBar;
