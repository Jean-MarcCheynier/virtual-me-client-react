import React, { useMemo, useState } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

interface ISortableSectionProps<T> {
  title: string
  sort?: (a: T, b: T) => any
  items: T[],
  Component: React.FC<any>
  
}

enum FilterEnum {
  "desc",
  "asc",
  "none"
}

const icons = {
  [FilterEnum.asc]: {
    Icon: FaSortUp,
    next: FilterEnum.desc,
    hover: "sortButton.tooltip.asc"
  },
  [FilterEnum.desc]: {
    Icon: FaSortDown,
    next: FilterEnum.none,
    hover: "sortButton.tooltip.desc"
  }
  , [FilterEnum.none]: {
    Icon: FaSort,
    next: FilterEnum.asc,
    hover: "sortButton.tooltip.none"
  }
}

const SortButton: React.FC<{ filter: FilterEnum }> = ({ filter }) => {
  const { Icon } = icons[filter];
  return <Icon size={"20"}/>
}

const SortHeader: React.FC< { filter: FilterEnum, setFilter: (next: FilterEnum) => void } > = ({ filter, setFilter, children }) => {

  const { next } = icons[filter];

  return <h4 className="text-primary" onClick={() => setFilter(next)}>
    {children}&nbsp;<small><SortButton filter={filter} /></small>
  </h4>
}

const SortableSection: React.FC<ISortableSectionProps<any>> = (props) => {
  const { title, items, sort, Component } = props;
  const [filter, setFilter] = useState(FilterEnum.desc);
  
  const sortedItems = useMemo(() => {
    if (items) {
      switch (filter) {
        case FilterEnum.desc:
          return ((sort))?[...items].sort(sort).reverse():items
        case FilterEnum.asc:
          return ((sort)) ? [...items].sort(sort) : items
        default:
          return items;
      }
    } else {
      return [];
    }
  }, [filter, items, sort])
  
  return <section>
    <SortHeader setFilter={setFilter} filter={filter}>{title}</SortHeader>
    {sortedItems.map((item: any, index: number) => (<Component key={index} {...item} />))}
    
  </section>
}

export default SortableSection;