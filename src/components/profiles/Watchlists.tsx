/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { useAuthUser } from "../../lib/context";
import {
  QUERY_AUTH_USER,
  MUTATION_DELETE_WATCHLIST,
  Watchlist,
} from "../../lib/graphql";
import Link from "next/link";

import Dropdown, { DropdownList } from "../common/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faEdit,
  faEllipsisH,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/profiles/watchlists.module.scss";

interface ISymbol {
  symbol: string;
}

const Symbol = ({ symbol }: ISymbol) => {
  return (
    <Link href={`/app/stocks/${symbol}`}>
      <a className={styles.symbolRoot}>
        <p className={styles.symbol}>{symbol.toUpperCase()}</p>
      </a>
    </Link>
  );
};

interface IListItemProps {
  list: Watchlist;
  isLast: boolean;
}

const ListItem = ({ list }: IListItemProps) => {
  const [active, setActive] = useState(true);
  const [dropdownActive, setDropdownActive] = useState(false);

  const [deleteWatchlist] = useMutation<{ deleteWatchlist: string }>(
    MUTATION_DELETE_WATCHLIST,
    {
      variables: { id: list.id },
      update: (store) => {
        const user: { me: any } = store.readQuery({ query: QUERY_AUTH_USER });

        let newWatchlists = [...user.me.profile.watchlists];

        newWatchlists = newWatchlists.filter(({ id }) => id !== list.id);

        const newData = {
          me: {
            ...user.me,
            profile: { ...user.me.profile, watchlists: newWatchlists },
          },
        };

        store.writeQuery({ query: QUERY_AUTH_USER, data: newData });
      },
      // tslint:disable-next-line:no-empty
      onError: () => {},
    }
  );

  const toggleExpanded = (e: any) => {
    e.preventDefault();
    setActive(!active);
  };

  const closeDropdown = () => setDropdownActive(false);

  const toggleDropdown = (e: any) => {
    e.preventDefault();
    setDropdownActive(!dropdownActive);
  };

  const onDelete = (e: any) => {
    e.preventDefault();
    deleteWatchlist();
  };

  const onUpdate = (e: any) => {
    e.preventDefault();
  };

  const expandSwitchClasses = [styles.activeSwitch];

  if (!active) expandSwitchClasses.push(styles.collapsed);

  const dropdownOptions = [
    {
      label: "Edit",
      icon: faEdit,
      action: (e: any) => {
        e.preventDefault();
        // open update menu
      },
    },
    {
      label: "Delete",
      icon: faTrashAlt,
      action: onDelete,
      danger: true,
    },
  ];

  return (
    <div className={styles.list}>
      <div className={styles.listHeader}>
        <h5>{list.name}</h5>
        <div className={styles.options}>
          <a className={styles.icon} onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </a>
          <a className={styles.icon} onClick={toggleExpanded}>
            <FontAwesomeIcon
              icon={faChevronUp}
              className={expandSwitchClasses.join(" ")}
            />
          </a>
        </div>
        <Dropdown isOpen={dropdownActive} onClose={closeDropdown}>
          <DropdownList options={dropdownOptions} />
        </Dropdown>
      </div>
      {list.symbols.length > 0 && active && (
        <div className={styles.listSymbols}>
          {list.symbols.map((symbol) => (
            <Symbol symbol={symbol} key={symbol} />
          ))}
        </div>
      )}
    </div>
  );
};

const Watchlists = () => {
  const { user } = useAuthUser();

  const renderWatchlist = (item: Watchlist, index: number) => (
    <ListItem
      list={item}
      isLast={index === user.profile.watchlists.length - 1}
      key={item.id}
    />
  );

  if (user)
    return <Fragment>{user.profile.watchlists.map(renderWatchlist)}</Fragment>;

  return null;
};

export default Watchlists;
