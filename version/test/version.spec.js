import { expect } from "chai";
import { gt, gte, lt, lte } from "../dist";

describe("version", () => {
  describe("#gt", () => {
    it("gt('1.0', '1.0.1')=false", () => {
      expect(gt("1.0", "1.0.1")).to.false;
    });
    it("gt('1.0.1', '1.0')=true", () => {
      expect(gt("1.0.1", "1.0")).to.true;
    });
    it("gt('1.0.1', '1.0.1')=false", () => {
      expect(gt("1.0.1", "1.0.1")).to.false;
    });
  });

  describe("#gte", () => {
    it("gte('1.0', '1.0.1')=false", () => {
      expect(gte("1.0", "1.0.1")).to.false;
    });
    it("gte('1.0.1', '1.0')=true", () => {
      expect(gte("1.0.1", "1.0")).to.true;
    });
    it("gte('1.0.1', '1.0.1')=true", () => {
      expect(gte("1.0.1", "1.0.1")).to.true;
    });
  });

  describe("#lt", () => {
    it("lt('1.0', '1.0.1')=true", () => {
      expect(lt("1.0", "1.0.1")).to.true;
    });
    it("lt('1.0.1', '1.0')=false", () => {
      expect(lt("1.0.1", "1.0")).to.false;
    });
    it("lt('1.0.1', '1.0.1')=false", () => {
      expect(lt("1.0.1", "1.0.1")).to.false;
    });
  });

  describe("#lte", () => {
    it("lte('1.0', '1.0.1')=true", () => {
      expect(lte("1.0", "1.0.1")).to.true;
    });
    it("lte('1.0.1', '1.0')=false", () => {
      expect(lte("1.0.1", "1.0")).to.false;
    });
    it("lte('1.0.1', '1.0.1')=true", () => {
      expect(lte("1.0.1", "1.0.1")).to.true;
    });
  });
});
