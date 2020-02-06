import {
  GetInputProps,
  GetItemProps,
  GetLabelProps,
  GetMenuProps,
} from './types';

const noop = () => {};

export function getAccessibilityGetters<TItem>(id: string) {
  const getInputProps: GetInputProps = props => {
    return {
      ...props,
      'aria-autocomplete': 'list',
      'aria-activedescendant': null,
      'aria-controls': null,
      'aria-labelledby': `${id}-label`,
      autoComplete: 'off',
      value: '',
      id: `${id}-input`,
      onInput: noop,
      onKeyDown: noop,
      onBlur: noop,
    };
  };

  const getItemProps: GetItemProps<TItem> = props => {
    if (props.item === undefined) {
      throw new Error('`getItemProps` expects an `item`.');
    }

    return {
      ...props,
      id: `${id}-item-${props.item.id}`,
      role: 'option',
      'aria-selected': props.item.isActive,
      onMouseMove: noop,
      onMouseDown: noop,
      onClick: noop,
    };
  };

  const getLabelProps: GetLabelProps = props => {
    return {
      ...props,
      htmlFor: `${id}-input`,
      id: `${id}-label`,
    };
  };

  const getMenuProps: GetMenuProps = props => {
    return {
      ...props,
      role: 'listbox',
      'aria-labelledby': `${id}-label`,
      id: `${id}-menu`,
    };
  };

  return {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
  };
}
