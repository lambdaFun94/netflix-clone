import { render, fireEvent } from "@testing-library/react";

import { Player } from "../../components";

describe("<Player />", () => {
  it("renders the  <Player /> with a video", () => {
    const { getByText, getByTestId } = render(
      <Player>
        <Player.Button />
        <Player.Video src="/videos/bunny.mpf" />
      </Player>
    );
  });
});
