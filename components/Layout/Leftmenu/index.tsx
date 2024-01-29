import { Sidenav, Nav, Sidebar } from 'rsuite';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CustomSidenav = ({ expanded, onExpand, items, activeKey, onSelect }) => {
  return (
    <Sidebar
      style={{ display: 'flex', flexDirection: 'column' }}
      width={expanded ? 260 : 56}
      collapsible
    >
      <Sidenav expanded={expanded} className='h-full'>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={onSelect}>
            {items.map((item, key) => (
              <Nav.Item
                key={key}
                eventKey={key.toString()}
                icon={item.icon}
                as={Link}
                href={item.link}
              >
                {item.caption}
              </Nav.Item>
            ))}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={onExpand} />
      </Sidenav>
    </Sidebar>
  );
};

const Leftmenu = ({ items }) => {
  const router = useRouter();
  let currentPath = router.pathname;
  const [activeKey, setActiveKey] = useState('1');
  const [expanded, setExpand] = useState(true);

  useEffect(() => {
    items.map((item, key) => {
      if (item.link === currentPath) {
        setActiveKey(key.toString());
        return;
      }
    });
  }, [currentPath]);

  return (
    <>
      <CustomSidenav
        activeKey={activeKey}
        onSelect={setActiveKey}
        expanded={expanded}
        onExpand={setExpand}
        items={items}
      />
    </>
  );
};

export default Leftmenu;
