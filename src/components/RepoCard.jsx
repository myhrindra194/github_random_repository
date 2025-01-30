import {
  BookmarkIcon,
  ExclamationCircleIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/16/solid";

/* eslint-disable react/prop-types */
const RepoCard = ({ repo, selectedLanguage }) => {
  return (
    <div className="max-w-80 w-80 h-auto border-2 rounded-2xl mt-4 px-5 py-10">
      <p className="text-sm font-semibold">{repo?.full_name}</p>
      <p className="text-xs mt-2 text-slate-500">{repo?.description}</p>
      <ul className="text-xs flex mt-6 text-slate-500 justify-between align-middle">
        <li className="flex justify-center align-top font-semibold">
          <BookmarkIcon className="size-4 me-2 text-amber-400" />
          {selectedLanguage}
        </li>
        <li className="flex justify-center align-top">
          <StarIcon className="size-4 me-2" />
          {repo?.stargazers_count}
        </li>
        <li className="flex justify-center align-top">
          <ShareIcon className="size-4 me-2" />
          {repo?.forks_count}
        </li>
        <li className="flex justify-center align-top">
          <ExclamationCircleIcon className="size-4 me-2" />
          {repo?.open_issues_count}
        </li>
      </ul>
    </div>
  );
};

export default RepoCard;
