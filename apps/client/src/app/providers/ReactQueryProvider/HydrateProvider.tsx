import { HydrateProps, Hydrate } from 'react-query';

type HydrateProviderProps = HydrateProps;

const HydrateProvider: React.FC<HydrateProviderProps> = ({
  children,
  state,
}) => {
  return <Hydrate state={state}>{children}</Hydrate>;
};

export default HydrateProvider;
