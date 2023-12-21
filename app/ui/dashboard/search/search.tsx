"use client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params: URLSearchParams = new URLSearchParams(searchParams);

    params.set("page", "1"); // Convert the value to string

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
