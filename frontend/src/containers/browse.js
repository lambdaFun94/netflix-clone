import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Fuse from "fuse.js";

import { signOut } from "../redux/slices/userSlice";
import { FooterContainer } from "./footer";
import { Loading, Header, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import SelectProfileContainer from "./profiles";
import logo from "../logo.svg";

export default function BrowseContainer({ films, series }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [slideRows, setSlideRows] = useState(series);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setSlideRows(series);
  }, [series]);

  useEffect(() => {
    const { data } = slideRows;
    const fuse = new Fuse(data, {
      keys: ["data.description", "data.title", "data.genre"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    if (data.length > 0 && searchTerm.length > 3 && results.length) {
      setSlideRows({ name: slideRows.name, data: results });
    }
  }, [searchTerm]);

  return profile.displayName ? (
    <>
      {loading ? (
        <Loading src={user.profilePicture} />
      ) : (
        <Loading.ReleaseBody />
      )}

      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
            <Header.TextLink
              active={slideRows.name === "series" ? "true" : "false"}
              onClick={() => setSlideRows(series)}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={slideRows.name === "films" ? "true" : "false"}
              onClick={() => setSlideRows(films)}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.profilePicture} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.profilePicture} />
                  <Header.TextLink>{user.name}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink
                    onClick={() => {
                      dispatch(signOut());
                      history.push(ROUTES.HOME);
                    }}
                  >
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Forever alone in a crowd, failed comedian Arthur Fleck seeks
            connection as he walks the streets of Gotham City. Arthur wears two
            masks -- the one he paints for his day job as a clown, and the guise
            he projects in a futile attempt to feel like he's part of the world
            around him.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Card.Group>
        {slideRows.data.map((slideItem) => (
          <Card key={`${slideRows.name}-${slideItem.category}`}>
            <Card.Title>{slideItem.category}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item._id} item={item}>
                  <Card.Image
                    src={`/images/${slideRows.name}/${item.genre}/${item.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={slideRows.name}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
