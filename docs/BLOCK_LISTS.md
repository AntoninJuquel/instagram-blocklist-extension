# Block Lists

## Premade Lists

Users have the option to import premade block lists provided by the extension. These lists cover various topics and purposes, making it easier for users to block accounts related to specific themes or events.

## Keeping Up-to-Date with Premade Lists

Premade lists provided by the extension are periodically updated to ensure that users have access to the latest block lists relevant to their needs.

## Creating Your Own Block List Manually

Users can also create their own block lists manually. This can be done by constructing a text file following the Block List structure outlined above. Users can add or remove entries as needed to customize their block lists according to their preferences.

## Title and Description

A Block List consists of a title and a description, providing context and information about the list's contents and purpose.

**Example**:

```
title: Title of the Block List
description: Description of the Block List
```

## Constructing a User with ID and Name

Each entry in the Block List represents a user on Instagram and is constructed using their unique user ID and username.

**Example**:

```
instagramblocklist:id=12345678;name=username
```

## Case Sensitive Labeling

It's important to note that all elements within the Block List, including titles, descriptions, user IDs, and usernames, are case sensitive.

**Example**:

```
instagramblocklist:id=12345678;name=UserName
```

is not the same as

```
instagramblocklist:id=12345678;name=username
```

## Duplicate ids

Duplicate ids are not allowed within a Block List. If a user is listed multiple times, only the first entry will be considered, and subsequent ids will be ignored.
