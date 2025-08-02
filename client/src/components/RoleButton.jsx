import { useSelector } from 'react-redux';
import GridButton from './GridButton';

const RoleButton = ({ allowedRoles = [], Icon: IconComponent, ...props }) => {
  const user = useSelector((state) => state.auth.user);
  const isAllowed = user && allowedRoles.includes(user.role);

  return (
    <GridButton
      {...props}
      Icon={IconComponent} // ✅ pass correctly
      hide={!isAllowed}
    />
  );
};

export default RoleButton;
