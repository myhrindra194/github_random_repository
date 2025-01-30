import { useEffect, useState } from "react";
import RepoCard from "./components/RepoCard";
import StateCard from "./components/StateCard";
import { fetchData, randomizeRepo } from "./utils/function";

const App = () => {
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [repo, setRepo] = useState([]);
  const [finalRepo, setFinalRepo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const languageUri = import.meta.env.VITE_LANGUAGES_URI;
    fetchData(languageUri)
      .then((data) => setLanguageList(data))
      .catch((error) => {
        console.error(error);
        setError("Erreur fetching languages");
      });
  }, []);

  useEffect(() => {
    if (selectedLanguage !== "") {
      const repoUri = `${
        import.meta.env.VITE_SEARCH_REPO_URI
      }?q=${selectedLanguage}&per_page=50}`;
      fetchData(repoUri)
        .then((data) => {
          setRepo(data.items);
          setFinalRepo(randomizeRepo(data.items));
          setError(null);
        })
        .catch((error) => {
          console.error(error);
          setError("Erreur fetching repositories");
        });
    }
  }, [selectedLanguage]);

  const handleChange = (e) => setSelectedLanguage(e.target.value);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 border-2 border-slate-200 rounded-xl">
        <h2 className="text-lg">Github Repository Finder</h2>

        <select
          name="language"
          id="language"
          className="mt-4 block w-full py-2 rounded-lg px-2 border-2"
          value={selectedLanguage}
          onChange={handleChange}
        >
          {languageList?.map((item) => (
            <option
              key={languageList.indexOf(item)}
              value={item.value}
              className="my-2"
            >
              {item.title}
            </option>
          ))}
        </select>

        {error ? (
          <>
            <StateCard message={error} bgColor="bg-red-200" />
            <button className="mt-4 text-center w-full bg-red-500 h-10 text-white rounded-xl">
              <p className="font-semibold">Click to retry</p>
            </button>
          </>
        ) : selectedLanguage === "" ? (
          <StateCard
            message="Please select a language"
            bgColor="bg-slate-200"
          />
        ) : repo.length === 0 ? (
          <StateCard message="Loading please wait..." bgColor="bg-slate-200" />
        ) : (
          <>
            <RepoCard repo={finalRepo} selectedLanguage={selectedLanguage} />
            <button
              className="mt-4 text-center w-full bg-slate-900 h-10 text-white rounded-xl"
              onClick={() => setFinalRepo(randomizeRepo(repo))}
            >
              <p className="font-semibold">Refresh</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
