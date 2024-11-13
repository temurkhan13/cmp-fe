import React from 'react';
import { Button } from '../../../components/feature';
import { useDispatch, useSelector } from 'react-redux';
import { setSiteMapName } from '../../../redux/slices/sitemapSlice';
import { useUpdateSiteMapameMutation } from '../../../redux/api/workspaceApi';
import { useParams } from 'react-router-dom';
export const SiteMapNameField = () => {
  const siteMapName = useSelector((state) => state.siteMap?.siteMapName) || '';
  const siteMapNameee = useSelector((state) => state.siteMap) || '';

  console.log(siteMapNameee, '9999');
  const [updateSiteMap] = useUpdateSiteMapameMutation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleClickUpdate = async () => {
    const user = JSON.parse(localStorage.getItem('user') || null);
    if (user) {
      await updateSiteMap({
        userId: user.id,
        siteMapId: id,
        sitemapName: siteMapName,
      });
    }
  };
  return (
    <>
      <input
        type="text"
        style={{ padding: '6px 8px' }}
        value={siteMapName}
        onChange={(e) => dispatch(setSiteMapName(e.target.value))}
      />
      <Button 
      disabled={siteMapName === ""}
      onClick={handleClickUpdate} className="primary">
        Update
      </Button>
    </>
  );
};
