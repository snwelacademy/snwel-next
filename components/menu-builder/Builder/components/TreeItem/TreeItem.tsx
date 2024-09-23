import React, { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";
import { Collapse } from "./Collapse";
import { TreeItem as TreeItemType, TreeItems } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";
import FileUploadModal from "@/components/modal/FileUploadModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
  childs?: TreeItems;
  show?: string;
  updateitem?: (
    id: UniqueIdentifier,
    data: Omit<TreeItemType, "children">
  ) => void;
  otherfields?: any;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      updateitem,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [newData, setNewData] = React.useState<
      Omit<TreeItemType, "children">
    >({
      id: value,
      href: props?.otherfields?.href,
      img: props?.otherfields?.img,
      name: props?.otherfields?.name,
      desc: props?.otherfields?.desc,
    });

    return (
      <li
        className={classNames({
          Wrapper: true,
          clone: clone,
          ghost: ghost,
          indicator: indicator,
          disableSelection: disableSelection,
          disableInteraction: disableInteraction,
        })}
        ref={wrapperRef}
        style={
          {
            ...(!clone
              ? {
                paddingLeft: `${indentationWidth * depth}px`,
              }
              : {}),
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          {...handleProps}
          className="TreeItem"
          ref={ref}
          style={{
            ...style,
            height:
              ghost && indicator && childCount
                ? `${childCount * 42 + (childCount - 1) * 9}px`
                : "42px",
          }}
        >
          <span className={"Text"}>
            {props?.otherfields?.name}{" "}
            <span
              style={{
                fontSize: "13px",
                fontWeight: "400",
                fontStyle: "italic",
                color: "#50575e",
                marginLeft: "4px",
              }}
            >
              {depth > 0 ? "sub item" : ""}
            </span>
          </span>
          {!clone && onRemove && (
            <Collapse open={open} handleOpen={() => setOpen(!open)} />
          )}
          {clone && childCount && childCount > 1 ? (
            <div className={"Count"}>
              {props.childs &&
                props.childs.map((child: any) => {
                  return (
                    <RecursiveItem child={child} key={child.id} nDepth={1} />
                  );
                })}
            </div>
          ) : null}
        </div>
        {!(props.show === "true") && open && (
          <div
            style={{
              width: "412px",
              border: "1px solid #c3c4c7",
              marginTop: "-1px",
            }}
          >
            <div
              className="space-y-2 p-2"
            >
              <div>
                <Label

                  htmlFor="label"
                >
                  Navigation Label
                </Label>
                <Input
                  value={newData.name}
                  onChange={(e) => {
                    setNewData({ ...newData, name: e.target.value });
                  }}
                  type="text"
                  id="label"

                />
              </div>
              <div>
                <Label

                  htmlFor="href"
                >
                  Navigation Url
                </Label>
                <Input
                  value={newData.href}
                  onChange={(e) => {
                    setNewData({ ...newData, href: e.target.value });
                  }}
                  type="text"
                  id="href"
                />
              </div>
              <div>
                <Label

                  htmlFor="desc"
                >
                  Menu Short Description
                </Label>
                <Textarea
                  value={newData.desc}
                  onChange={(e) => {
                    setNewData({ ...newData, desc: e.target.value });
                  }}

                  id="desc"
                />
              </div>
              <div>
                <Label
                >
                  Navigation Image
                </Label>
                <div className="flex items-center gap-5 ">
                  {
                    newData?.img &&
                    <div className="rounded-xl bg-center bg-contain overflow-hidden w-28 h-28 bg-no-repeat" style={{ backgroundImage: `url(${newData?.img})` }}>
                      {/* <img src={newData.img} className="max-w-full" /> */}
                    </div>
                  }
                  <FileUploadModal
                    trigger={<Button className="w-full">{newData.img ? 'Change Image' : "Add Image"}</Button>}
                    value={newData.img}
                    onChange={(e) => {
                      setNewData({ ...newData, img: e });
                    }}

                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <Button
                  variant={'outline'}
                  size={'sm'}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateitem && updateitem(value, newData);
                    setOpen(false);
                  }}
                >
                  Save Menu
                </Button>
                <button
                  style={{
                    all: "unset",
                    fontSize: "13px",
                    color: "#b32d2e",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    onRemove && onRemove();
                  }}
                >
                  Delete Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }
);

TreeItem.displayName = "TreeItem";

const RecursiveItem = (props: {
  child: TreeItemType;
  nDepth: number;
  key: string;
}) => {
  const newDepth = props.nDepth + 1;
  return (
    <>
      <div
        style={{
          width: "414px",
          height: "42px",
          border: "1px solid #dcdcde",
          marginTop: "9px",
          marginLeft: `${props.nDepth * 50}px`,
          backgroundColor: "#f6f7f7",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "0.5rem",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        {props.child.name}{" "}
        <span
          style={{
            fontSize: "13px",
            fontWeight: "400",
            fontStyle: "italic",
            color: "#50575e",
            marginLeft: "4px",
          }}
        >
          sub item
        </span>
      </div>
      {props.child.children.map((child: any) => {
        return <RecursiveItem key={child.id} child={child} nDepth={newDepth} />;
      })}
    </>
  );
};
